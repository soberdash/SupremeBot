module.exports = (client, oldMessage, newMessage) => {
    const Discord = require('discord.js')
    const mongoose = require('mongoose')
    const logsSchema = require('../models/logs.js')

    logsSchema.findOne({
        guildID: oldMessage.guild.id
    }, (err, guild) => {
        if(err) return console.error(err)
        if(!guild) return
        else{
            if(oldMessage.author.bot) return
            if(newMessage.content == ' ') return
            const embed = new Discord.MessageEmbed()
                .setTitle('SupremeBot | Logs | Mensaje Editado')
                .addField('**Autor**', `Tag: ${oldMessage.author.tag}\nID: ${oldMessage.author.id}`)
                .addField('**Mensaje**', `Mensaje Anterior: ${oldMessage.content}\nMensaje Nuevo: ${newMessage.content}\nID: ${newMessage.id}`)
                .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
                .setTimestamp()
                .setFooter('Logs | '+oldMessage.guild.name)
                .setColor('RANDOM')
            let ch = guild.channelID
            oldMessage.guild.channels.resolve(ch).send(embed)
        }
    })
}