let arrayArgs = [
    "add",
    "remove",
    "list"
]

module.exports = {
    name: "blacklist",
    usage: `blacklist <${arrayArgs.join("/")}> {ID}`,
    alias: ["black"],
    cooldown: 5,
    onlyowner: false,
    onlydev: true,
    perms: [],
    run: async (client, message, args, storage) => {

        const Discord = require("discord.js");
        const misc = require("../utils/misc.json");

        const principalEmbed = new Discord.MessageEmbed()
            .setTitle("SupremeBot")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor("RANDOM")
            .addField("Add Users", `\`${storage.guild.prefix}blacklist add <ID>\``)
            .addField("Remove Users", `\`${storage.guild.prefix}blacklist remove <ID>\``)
            .addField("Blacklisted Users List", `\`${storage.guild.prefix}blacklist list\``)
            .setTimestamp()
            .setFooter(require("../langs/lang_en.json").embed.footer);

        if(!args[0] || !arrayArgs.includes(args[0])) {
            message.channel.send(principalEmbed);
            return;
        }

        let argID = args[1];

        if(args[0] === "add") {
            if(!argID || isNaN(argID) || isNaN(argID) && argID !== 18 || message.author.id === argID || misc.owners.id.includes(argID) || client.users.resolve(argID).bot || client.user.id === argID) {
                message.channel.send(storage.emoji.static.info.string + "The data entered does not meet the requirements.");
                return;
            }
            storage.UserSchema.findOne({
                userID: argID
            }, (err, user) => {
                if(err) {
                    return storage.Log.error(err);
                }
                if(!user) {
                    message.channel.send(storage.emoji.animated.no.string + "The entered ID does not appear in our databases.");
                    return;
                }
                else {
                    if(user.blacklisted) {
                        message.channel.send(storage.emoji.animated.no.string + "This user is already blacklisted in our database!");
                        return;
                    }
                    storage.UserSchema.findOneAndUpdate({
                        userID: argID
                    }, {
                        $set: {
                            blacklisted: true
                        }
                    }, {
                        new: true
                    }).then(() => {
                        message.channel.send(storage.emoji.animated.yes.string + "The ID has been added to the database successfully!")
                    }).catch((err) => {
                        message.channel.send(storage.errorEmbed);
                        storage.Log.log(err);
                    });
                }
            });
        }
        if(args[0] === "remove") {
            if(!argID || isNaN(argID) || isNaN(argID) && argID !== 18) {
                message.channel.send(storage.emoji.static.info.string + "The data entered does not meet the requirements.");
                return;
            }
            storage.UserSchema.findOne({
                userID: argID
            }, (err, user) => {
                if(err) {
                    return storage.Log.error(err);
                }
                if(!user) {
                    message.channel.send(storage.emoji.animated.no.string + "The entered ID does not appear in our databases.");
                    return;
                }
                else {
                    if(!user.blacklisted) {
                        message.channel.send(storage.emoji.animated.no.string + "This user is not blacklisted in our database!");
                        return;
                    }
                    storage.UserSchema.findOneAndUpdate({
                        userID: argID
                    }, {
                        $set: {
                            blacklisted: false
                        }
                    }, {
                        new: true
                    }).then(() => {
                        message.channel.send(storage.emoji.animated.yes.string + "The ID has been removed to the database successfully!")
                    }).catch((err) => {
                        message.channel.send(storage.errorEmbed);
                        storage.Log.log(err);
                    });
                }
            });
        }
        if(args[0] === "list") {

            let search = await storage.UserSchema.find();
            let list = search.filter(u => u.blacklisted === true).map(u => `+ ${client.users.resolve(u.userID).tag} (${u.userID})`).join(" \n");
            message.channel.send("```diff\n- SupremeBot Blacklist\n \n" + list + "\n \n--- Supreme Project ---```")


        }
    }
};