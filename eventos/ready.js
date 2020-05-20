const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('/home/jeffrey/sb/config.json')
const mongoose = require('mongoose')
mongoose.connect(config.connect, (err) => {
  if(err) return console.error(err)
  console.log('SupremeBot se ha conectado correctamente a la base de datos MongoDB!')
})
module.exports = async (client, message) => {
  const actividades = [
    ">vote",
    "si no conoces mi prefijo, mencioname!",
    `${client.guilds.cache.size} servidores y ${client.users.cache.size} usuarios!`,
    "SupremeProject!",
    ">help",
    "quédate en casa!",
    "bit.ly/supremebotdc"
  ];
  setInterval(() => {
    const index = Math.floor(Math.random() * (actividades.length - 1) + 1);
    const estado = actividades[index]
    client.user.setPresence({
      status: 'dnd',
      activity: {
        name: estado,
        type: 'WATCHING'
      },
    });
  }, 20000);
}
