module.exports = (client, message) =>  {
    const { Console } = require("console");
    var Log = new Console({ stdout: process.stdout, stderr: process.stderr });
    const Discord = require("discord.js");
    const guildSchema = require("../models/guild.js");
    const UserSchema = require("../models/user.js");
    let prefix = ">";
    var emoji = require("../utils/emoji.json");
    UserSchema.findOne({
        userID: message.author.id
    }, (err, user) => {
        if(err) {
            Log.error(err);
        }
        if(!user) {
            const newUserSchema = new UserSchema({
                userID: message.author.id,
                lang: "lang_en"
            });
            return newUserSchema.save();
        }
        var nLang = user.lang;
        var lang = require(`../langs/${user.lang}.json`);
        guildSchema.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) {
                Log.error(err);
            }
            var prefix = guild.prefix;
            var errorEmbed = new Discord.MessageEmbed()
                .setTitle(lang.embed.titleerror)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(lang.command.error)
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
            if(!message.member.permissions.has(cmd.perms)) {
                message.channel.send(lang.command.noperms + `\`${cmd.perms.join(", ")}\``);
                return;
            }

            try {
                cmd.run(client, message, args, lang, prefix, Log, nLang, errorEmbed, emoji);
            } catch(err) {
                message.channel.send(errorEmbed);
                Log.error(err);
                client.channels.resolve("737746024810020939").send(`Ha ocurrido un error al ejecutar el comando \`${cmd.name}\`. Para más información revisa la consola.\n` + "```js\n" + err + "```");
            }
        });
    });
};