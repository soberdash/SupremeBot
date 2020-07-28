module.exports = {
    name: "lang",
    alias: ["language", "idioma"],
    perms: [],
    run: (client, message, args, lang, prefix, Log, nLang, errorEmbed) => {

        const Discord = require("discord.js");
        const UserSchema = require("../models/user.js");

        let arrayArgs = [
            "es",
            "en"
        ];

        const principalEmbed = new Discord.MessageEmbed()
            .setTitle(lang.langembed.title)
            .setDescription(lang.langembed.desc)
            .addField(lang.langembed.fieldtitles.avaible, `\`${arrayArgs.join(", ")}\``)
            .addField(lang.langembed.fieldtitles.usage, `\`${prefix}lang <${arrayArgs.join("/")}>\``)
            .setColor("RANDOM")
            .setFooter(lang.embed.footer)
            .setTimestamp();
        if(!args[0]) {
            message.channel.send(principalEmbed);
            return;
        }
        if(args[0] === 'es') {
            if(nLang === 'lang_es') {
                message.channel.send("Ya tienes este idioma seleccionado!");
                return;
            }
            UserSchema.findOneAndUpdate({ userID: message.author.id }, { $set: { lang: "lang_es" } }, { new: true }).then(() => {
                message.channel.send("Se ha cambiado correctamente el idioma a Español!");
            }).catch((err) => {
                message.channel.send(errorEmbed);
            });
        }
        if(args[0] === 'en') {
            if(nLang === 'lang_en') {
                message.channel.send("You already have this language selected!");
                return;
            }
            UserSchema.findOneAndUpdate({ userID: message.author.id }, { $set: { lang: "lang_en" } }, { new: true }).then(() => {
                message.channel.send("Language has been successfully changed to English!");
            }).catch((err) => {
                message.channel.send(errorEmbed);
            });
        }
    }
}