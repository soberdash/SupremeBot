module.exports = (client, message, args) => {
    const Discord = require('discord.js')
    let user = message.mentions.users.first() || client.users.resolve(args[0])
    let autor = message.author
    if(!user){
      const embed = new Discord.MessageEmbed()
        .setDescription(`<:info:712004394727505981> No ves la imágen? [Descargala acá!](${message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})`)
        .setImage(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setColor(message.guild.member(autor).displayHexColor)
        .setFooter(`Avatar de ${autor.tag}`);
      message.channel.send(embed)
    }else{
      const embed = new Discord.MessageEmbed()
        .setDescription(`<:info:712004394727505981> No ves la imágen? [Descargala acá!](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})`)
        .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setColor('RANDOM')
        .setFooter(`Avatar de ${user.tag}`);
      message.channel.send(embed);
    }
  }