module.exports = (client, GuildChannel) => {
    const mongoose = require('mongoose')
    const Discord = require('discord.js')
    const logsSchema = require('../models/logs.js')

    logsSchema.findOne({
        guildID: GuildChannel.guild.id
    }, (err, guild) => {
        if(err) return console.error(err)
        if(!guild) return
        else{
            if(GuildChannel.type == 'dm') return
            const embed = new Discord.MessageEmbed()
                .setTitle('SupremeBot | Logs | Nuevo Canal')
                .addField('**Canal**', `Nombre: ${GuildChannel.name}\nID: ${GuildChannel.id}`)
                .setAuthor(GuildChannel.guild.name, GuildChannel.guild.iconURL())
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter('Logs | '+GuildChannel.guild.name)
            let ch = guild.channelID
            GuildChannel.guild.channels.resolve(ch).send(embed)
        }
    })
}
