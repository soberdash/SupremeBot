module.exports = (client, message) => {
  const prefix = '>'
  const config = require('/home/jeffrey/sb/config')
  const mongoose = require('mongoose')
  const Discord = require('discord.js')
	if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    message.channel.send('<:supreme:690641733641306223> Mi prefix en el servidor ``'+message.guild.name+'`` es: ``'+prefix+'``').then((msg) => {
      setTimeout(() => {
        message.delete();
        msg.delete();
      }, 7000)
    })
  }
  if (!message.content.startsWith(prefix)) return
  if (message.author.bot) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command.length === 0) return;
  let cmd = client.comandos.get(command);
  if (!cmd) return;
  cmd(client, message, args, prefix, Discord);
}