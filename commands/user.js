module.exports = (client, message, args) => {
    const Discord = require('discord.js')


    let author = message.author
    let tag = message.mentions.users.first() || client.users.resolve(args[0])

    if(!tag){
        const em = new Discord.MessageEmbed()
            .setTitle('SupremeBot')
            .setAuthor(author.tag, author.displayAvatarURL())
            .addField('**Nombre**', author.username, true)
            .addField('**Tag**', author.discriminator, true)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Perfil del usuario ${author.username}`)
        message.channel.send(em)
    }else{

    }
}