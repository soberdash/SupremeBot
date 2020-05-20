module.exports = (client, message, args) => {
    const Discord = require('discord.js')
    
    let pregunta = args.slice(0).join(" ")
    let frase = [
      "Si",
      "No",
      "Tal vez",
      "Pregúntamelo más tarde",
      "No se",
      "Pregúntamelo de nuevo",
      "Muy Probable",
      "Probablemente no"
    ]
    const f = frase[Math.floor(Math.random() * frase.length)]
    
    if(!pregunta) return message.channel.send('<:info:712004394727505981> Debes de proporcionar una pregunta.')
    const embed = new Discord.MessageEmbed()
      .addField('Tu pregunta', pregunta)
      .addField('Mi respuesta es:', '``'+f+'``')
      .setColor('RANDOM')
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
    message.channel.send(embed)
  }