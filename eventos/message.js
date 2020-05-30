module.exports = (client, message) => {
  const mongoose = require('mongoose')
  const prefixSchema = require('/home/jeffrey/sb/models/prefix.js')
  prefixSchema.findOne({
    guildID: message.guild.id
  }, (err, guild) => {
    if(err) return console.error(err)
    const prefix = guild.prefix
    const Discord = require('discord.js')
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      message.channel.send('<:supreme:690641733641306223> Mi prefix en el servidor ``'+message.guild.name+'`` es: ``'+prefix+'``')}
    if (!message.content.startsWith(prefix)) return
    if (message.author.bot) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command.length === 0) return;
    let cmd = client.comandos.get(command);
    if (!cmd) return;
    cmd(client, message, args, prefix);
  });
}
