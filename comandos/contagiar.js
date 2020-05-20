module.exports = (client, message, args) => {
    const Discord = require('discord.js')
    let usuariomencionado = message.mentions.users.first();
    if(!usuariomencionado) return message.channel.send(`<:info:712004394727505981> Debes mencionar a alguien para realizar esta acción.`)
    if(usuariomencionado.bot) return message.channel.send(`<:deny:706891458216460368> No puedes contagiar a bots.`)
    if(usuariomencionado === message.author) return message.channel.send(`<:deny:706891458216460368> No puedes contagiarte a ti mismo!`)
    let elementos = [ `https://i.imgur.com/XAVNWHV.gif`, `https://i.imgur.com/QlRNL54.gif`, `https://media.giphy.com/media/l4FGo3IonE0SdQYeY/giphy.gif`, `https://media.tenor.com/images/b70dc1261a92ac83c72f2e8bd018ddd8/tenor.gif`, `https://media.tenor.com/images/34a87fc7e2b621f6e8c165c09bdee0a3/tenor.gif`, `https://media.tenor.com/images/ea3944e93b1c5f66a7161ed832d35cfb/tenor.gif`, `https://media.tenor.com/images/74c4642f220a0be734f692de12b1aab0/tenor.gif`];//Puedes agregar mas gifs aqui o imagenes
    let captura = elementos[Math.floor(elementos.length * Math.random())]; 
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`${message.author.username} ha contagiado con Coronavirus a ${message.mentions.users.first().username}`)
      .setImage(captura)
    message.channel.send(embed);
  }