module.exports = async (client, message, args, prefix) => {
    const mongoose = require('mongoose')
    const Discord = require('discord.js')
    const logsSchema = require('../models/logs.js')
    const perms = message.member.permissions.has('MANAGE_GUILD')
    if(!perms) return message.channel.send('<a:ani_no:709633289106882590> No tienes permisos para realizar esta acción. Requerido: ``MANAGE_GUILD``')
    if(!args[0]){
        logsSchema.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) console.error(err)
            if(!guild){
                const info = new Discord.MessageEmbed()
                    .setTitle('SupremeBot Logs | '+message.guild.name)
                    .setDescription(`Para establecer el canal de logs en ${message.guild.name} utiliza:\n\`${prefix}logs set <canal>\``)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .addField('**Canal de Logs**', '``No establecido``')
                    .setColor('RANDOM')
                message.channel.send(info)
            }else{
                const info2 = new Discord.MessageEmbed()
                    .setTitle('SupremeBot Logs | '+message.guild.name)
                    .setDescription(`Para cambiar el canal de logs utiliza:\n\`${prefix}logs set <canal>\`\nPara eliminar utiliza:\n\`${prefix}logs unset\``)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .addField('**Canal de Logs**', `<#${guild.channelID}>`)
                    .setColor('RANDOM')
                message.channel.send(info2)
            }
        })
    }else if(args[0] === 'set'){
        if(!perms) return message.channel.send('<a:ani_no:709633289106882590> No tienes permisos para realizar esta acción.')
        const ch = message.mentions.channels.first()
        if(!ch) return message.channel.send('<:info:712004394727505981> Debes mencionar un canal.')
        logsSchema.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if(err) return console.error(err)
            if(!guild){
                const newlogs = new logsSchema({
                    guildID: message.guild.id,
                    channelID: ch.id
                })
                return newlogs.save().then(() => {
                    message.channel.send(`<a:ani_yes:709633371122434050> Listo! El canal de logs ha sido establecido a ${ch}.`)
                }).catch((err) => {
                    message.channel.send('<a:ani_no:709633289106882590> Ha ocurrido un error inesperado!')
                })
            }else{
                const nw = await logsSchema.findOneAndUpdate({ guildID: message.guild.id }, { $set: { channelID: ch.id } }, { new: true }).then(() => {
                    message.channel.send(`<a:ani_yes:709633371122434050> Listo! El nuevo canal de logs es ${ch}`)
                }).catch((err) => {
                    message.channel.send('<a:ani_no:709633289106882590> Ha ocurrido un error inesperado!')
                    console.error(err)
                })
            }
        })
    }else if(args[0] === 'unset'){
        logsSchema.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) console.error(err)
            if(!guild) return message.channel.send('<a:ani_no:709633289106882590> No puedo remover datos inexistentes')
            else{
                logsSchema.findOneAndRemove({ guildID: message.guild.id}).then(() => {
                    message.channel.send('<a:ani_yes:709633371122434050> He eliminado los datos para este servidor!')
                }).catch((err) => {
                    message.channel.send('<a:ani_no:709633289106882590> Ha ocurrido un error inesperado!')
                    console.error(err)
                })
            }
        })
    }
}