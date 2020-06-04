module.exports = (client, message) => {
  const mongoose = require('mongoose')
  const prefixSchema = require('../models/prefix.js')
  const Discord = require('discord.js')
  if(message.channel.type == 'dm'){
    if(message.author.bot) return
    ch = client.channels.resolve('717078511302475828')
    const em = new Discord.MessageEmbed()
        .setTitle('SupremeBot')
        .addField('**Autor**', message.author.tag)
        .addField('**Mensaje**', message.content)
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
    ch.send(em)
    message.author.send('Este mensaje será enviado al Servidor de Soporte. Si necesitas ayuda inmediata contáctate con un Administrador.\n``Si los mensajes no tienen importancia se bloqueará al usuario.``')
  }else{
    prefixSchema.findOne({
      guildID: message.guild.id
    }, (err, guild) => {
      if(err) return console.error(err)
      const prefix = guild.prefix
      if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        message.channel.send('<:supreme:690641733641306223> Mi prefix en el servidor ``'+message.guild.name+'`` es: ``'+prefix+'``')}
      if (!message.content.startsWith(prefix)) return
      if (message.author.bot) return
      if(message.content.startsWith(prefix+' ')) return
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      if (command.length === 0) return;
      let cmd = client.comandos.get(command);
      if (!cmd) return;
      cmd(client, message, args, prefix);
    });
  }

}
