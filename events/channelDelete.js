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
            const embed = new Discord.MessageEmbed()
                .setTitle('SupremeBot | Logs | Canal Eliminado')
                .addField('**Canal**', `Nombre: ${GuildChannel.name}\nID: ${GuildChannel.id}`)
                .setColor('RANDOM')
                .setFooter('Logs | '+GuildChannel.guild.name)
                .setTimestamp()
                .setAuthor(GuildChannel.guild.name, GuildChannel.guild.iconURL())
            let ch = guild.channelID
            GuildChannel.guild.channels.resolve(ch).send(embed)
            //if(GuildChannel.id === ch) return logsSchema.findOneAndDelete({guildID: GuildChannel.id}) no c que más
        }
    })
}