module.exports = (client, message, args) => {
    const Discord = require('discord.js')
    const mili = require('pretty-ms')
    const os = require("os")
    const embed = new Discord.MessageEmbed()
        .setTitle('SupremeBot')
        .addField('**Información**', '**Versión**\nRelease 5.0\n**Servidores**\n'+client.guilds.cache.size+'\n**Usuarios**\n'+client.users.cache.size+'\n**DevTeam**\n- Jeffrey#3717\n- Matías G.#2222\n**Discord Soporte**\n[SupremeProject Support](https://discord.gg/r4jMCVD)\n**Invitación**\n[Link](https://discordapp.com/api/oauth2/authorize?client_id=676258423620370443&permissions=2118118903&scope=bot)', true)
        .addField('**Especificaciones Técnicas**', '**Memoria**\n'+`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}GB`+'\n**Uptime**\n'+mili(client.uptime, {keepDecimalsOnWholeSeconds: true})+'\n**Sistema Operativo**\nUbuntu 18.04\n**Estructura**\nx64\n**Región**\nUS-Este', true)
        .setImage('https://top.gg/api/widget/676258423620370443.png')
        .setFooter('Cualquier duda o sugerencia puedes hacerlo en nuestro servidor de Discord!')
        .setColor('GREEN')
        
    message.channel.send(embed)
}