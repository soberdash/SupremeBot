module.exports = (client, message, args) => {
    const Discord = require('discord.js')
    
    let usuario = message.mentions.users.first()
    let autor = message.author
    
    let decimal = Math.random() * 20 + 1;
    let numero = Math.floor(decimal);
  
    if(!usuario){
      const embed = new Discord.MessageEmbed()
        .setTitle(`La Berenjena de ${autor.username} mide ${numero} centímetros`)
        .setImage('https://us.123rf.com/450wm/lihanna/lihanna1709/lihanna170900047/85715029-ilustraci%C3%B3n-de-berenjena-aislado-sobre-fondo-blanco-.jpg?ver=6')
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setColor('RANDOM')
      message.channel.send(embed)
    }else{
      if(usuario == client.user) return message.channel.send('Si lo supieras O.o')
      if(usuario.bot) return message.channel.send('<:deny:706891458216460368> No puedes realizar esta acción!')
      const embed = new Discord.MessageEmbed()
        .setTitle(`La Berenjena de ${usuario.username} mide ${numero} centímetros`)
        .setImage('https://us.123rf.com/450wm/lihanna/lihanna1709/lihanna170900047/85715029-ilustraci%C3%B3n-de-berenjena-aislado-sobre-fondo-blanco-.jpg?ver=6')
        .setFooter(usuario.tag, usuario.displayAvatarURL())
        .setColor('RANDOM')
      message.channel.send(embed)  
    }
  }