module.exports = (client, message) =>  {
    const { Console } = require("console");
    var Discord = require("discord.js");
    var GuildSchema = require("../models/guild.js");
    var UserSchema = require("../models/user.js");
    var Log = new Console({ stdout: process.stdout, stderr: process.stderr });
    var emoji = require("../utils/emoji.json");
    var misc = require("../utils/misc.json");

    UserSchema.findOne({
        userID: message.author.id
    }, (err, user) => {
        if(err) {
            Log.error(err);
        }
        if(!user) {
            const newUserSchema = new UserSchema({
                userID: message.author.id,
                lang: "lang_en",
                blacklisted: false,
                dev: false
            });
            return newUserSchema.save();
        }
        var lang = require(`../langs/${user.lang}.json`);

        var blacklistedEmbed = new Discord.MessageEmbed()
            .setTitle(lang.embed.titleerror)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(lang.embed.blacklisted)
            .setColor("RED")
            .setFooter(lang.embed.footer)
            .setTimestamp();

        GuildSchema.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) {
                Log.error(err);
            }

            var prefix = guild.prefix;

            if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
                message.channel.send(`<:supreme:690641733641306223> Mi prefix en el servidor \`${message.guild.name}\` es: \`${prefix}\``);
            }

            var errorEmbed = new Discord.MessageEmbed()
                .setTitle(lang.embed.titleerror)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(lang.embed.error)
                .setColor("RED")
                .setFooter(lang.embed.footer)
                .setTimestamp();

            if(!message.content.startsWith(prefix)) {
                return;
            }

            if(message.author.bot) {
                return;
            }

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            var cmd = client.commands.get(command) || client.commands.find((c) => c.alias && c.alias.includes(command));

            if(!cmd) {
                return;
            }

            if(user.blacklisted) {
                message.channel.send(blacklistedEmbed).then((msg) => {
                    msg.delete({ timeout: 10000 });
                    return;
                });
                return;
            }


            if(cmd.onlyowner) {
                if(!misc.owners.id.includes(message.author.id)) {
                    message.channel.send(emoji.animated.no.string + lang.command.onlydev);
                    return;
                }
            }

            if(cmd.onlydev) {
                if(!user.dev) {
                    message.channel.send(emoji.animated.no.string + lang.command.onlydev);
                    return;
                }
            }

            if(!message.member.permissions.has(cmd.perms)) {
                message.channel.send(emoji.animated.no.string + lang.command.noperms + `\`${cmd.perms.join(", ")}\``);
                return;
            }

            var storage = {
                guild: guild,
                user: user,
                lang: lang,
                emoji: emoji,
                errorEmbed: errorEmbed,
                Log: Log,
                GuildSchema: GuildSchema,
                UserSchema: UserSchema,
                Discord: Discord
            };

            const cmdCooldown = Math.floor(cmd.cooldown * 1000);
            const endCooldown = Math.floor(Date.now() + cmdCooldown);

            if(!client.cooldowns.has(`${message.author.id}.${cmd.name}`)) {
                client.cooldowns.set(`${message.author.id}.${cmd.name}`, 0);
            }

            const userCooldown = client.cooldowns.get(`${message.author.id}.${cmd.name}`);

            if(Date.now() < userCooldown) {
                let restCooldown = userCooldown - Date.now();
                let seconds = Math.floor(restCooldown / 1000);
                let cooldownMessage = lang.command.cooldown.replace("{command}", cmd.name).replace("{seconds}", seconds);
                message.channel.send(emoji.static.info.string + cooldownMessage).then((msg) => {
                    msg.delete({timeout: restCooldown});
                });
                return;
            }
            else {
                try {
                    cmd.run(client, message, args, storage);
                    client.cooldowns.set(`${message.author.id}.${cmd.name}`, endCooldown);
                } catch(err) {
                    message.channel.send(errorEmbed);
                    Log.error(err);
                    client.channels.resolve("737746024810020939").send(`Ha ocurrido un error al ejecutar el comando \`${cmd.name}\`. Para más información revisa la consola.\n` + "```js\n" + err + "```");
                }
            }
        });
    });
};