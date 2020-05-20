module.exports = (client, message, args) => {
  const Discord = require('discord.js');
  message.channel.send('Mi ping es de...').then(m => {
    setTimeout(() => {
      m.edit(`Mi ping es de \`${m.createdTimestamp - message.createdTimestamp} ms\` desde Microsoft Azure US-Central`)
    }, 1000)
  })
}