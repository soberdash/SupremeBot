module.exports = (client, GuildMember) => {
    const Discord = require('discord.js')
    const mongoose = require('mongoose')
    const logsSchema = require('../models/logs.js')

    //Bienvenida






    //Logs
    logsSchema.findOne({
        guildID: GuildMember.guild.id
    }, (err, guild) => {
        if(err) return console.error(err)
        if(!guild) return
        else{
            const embed = new Discord.MessageEmbed()
                .setTitle('SupremeBot | Logs | Nuevo Miembro')
                .addField('**Usuario**', `Tag: ${GuildMember.tag}\nID: ${GuildMember.id}`)
                .setColor('RANDOM')
                .setAuthor(GuildMember.tag, GuildMember.displayAvatarURL())
                .setFooter('Logs | '+GuildMember.guild.name)
                .setTimestamp()
            let ch = guild.channelID
            GuildMember.guild.channels.resolve(ch).send(embed)
        }
    })
}