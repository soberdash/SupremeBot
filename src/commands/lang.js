module.exports = {
    name: "lang",
    alias: ["language", "idioma"],
    perms: [],
    run: (client, message, args, lang, prefix, Log, nLang, errorEmbed, emoji) => {

        const Discord = require("discord.js");
        const UserSchema = require("../models/user.js");

        let arrayArgs = [
            "es",
            "en",
            "pt",
            "fr"
        ];

        const principalEmbed = new Discord.MessageEmbed()
            .setTitle(lang.langembed.title)
            .setDescription(lang.langembed.desc)
            .addField(lang.langembed.fieldtitles.avaible, `\`${arrayArgs.join(", ")}\``)
            .addField(lang.langembed.fieldtitles.usage, `\`${prefix}lang <${arrayArgs.join("/")}>\``)
            .setColor("RANDOM")
            .setFooter(lang.embed.footer)
            .setTimestamp();
        if(!args[0] || !arrayArgs.includes(args[0].toLowerCase())) {
            message.channel.send(principalEmbed);
            return;
        }
        let argLang = args[0].toLowerCase();
        if(`lang_${argLang}` === nLang) {
            message.channel.send(lang.changelang.same);
            return;
        }
        UserSchema.findOneAndUpdate({
            userID: message.author.id
        }, {
            $set: {
                lang: `lang_${argLang}`
            }
        }, {
            new: true
        }).then(() => {
            let newLang = require(`../langs/lang_${argLang}.json`)
            message.channel.send(newLang.changelang.successfully)
        }).catch((err) => {
            message.channel.send(errorEmbed);
        });
    }
};