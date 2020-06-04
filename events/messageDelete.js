module.exports = (client, message) => {
    const Discord = require('discord.js')
    const mongoose = require('mongoose')
    const logsSchema = require('../models/logs.js')

    logsSchema.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if(err) return console.error(err)
        if(!guild) return
        else{
            if(message.author.bot) return
            if(message.content == ' ') return
            const embed = new Discord.MessageEmbed()
                .setTitle('SupremeBot | Logs | Mensaje Eliminado')
                .setAuthor(message.author.tag, message.guild.iconURL())
                .addField('**Autor**', `Tag: ${message.author.tag}\nID: ${message.author.id}`)
                .addField('**Mensaje**', `ID: ${message.id}\nContenido: ${message.content}`)
                .setColor('RANDOM')
                .setFooter('Logs | '+message.guild.name)
                .setTimestamp()
            let ch = guild.channelID
            message.guild.channels.resolve(ch).send(embed)
        }
    })
}