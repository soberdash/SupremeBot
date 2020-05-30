module.exports = async (client, message, args) => {
    const mongoose = require('mongoose')
    const prefixSchema = require('/home/jeffrey/sb/models/prefix.js')
    const perms = message.member.permissions.has('MANAGE_GUILD')
    if(!perms) return message.channel.send('<a:ani_no:709633289106882590> No tienes permisos para realizar esta acción.')
    if(!args[0]){
        prefixSchema.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) return console.error(err)
            var prefix = guild.prefix
            message.channel.send(`<:supreme:690641733641306223> Mi prefix en el servidor ${message.guild.name} es \`${prefix}\`.\nPara cambiarlo utiliza \`${prefix}prefix set <prefix>\``)
        });
    }else if(args[0] === 'set'){
        let pr = args[1]
        if(!pr) return message.channel.send('<:info:712004394727505981> Debes de proporcionar un prefix.')
        if(pr.length > 3) return message.channel.send('<:deny:706891458216460368> El prefix no debe sobrepasar los ``3`` carácteres.')
        const nw = await prefixSchema.findOneAndUpdate({ guildID: message.guild.id }, { $set: { prefix: pr } }, { new: true }).then(() => {
            message.channel.send(`<a:ani_yes:709633371122434050> Listo! El nuevo prefix es \`${pr}\``)
        }).catch((err) => {
            message.channel.send('<a:ani_no:709633289106882590> Ha ocurrido un error! ('+err+')')
        })
    }else return
}