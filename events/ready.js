const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('/home/jeffrey/sb/config.json')
const prefixSchema = require('/home/jeffrey/sb/models/prefix.js')
const DBL = require('dblapi.js')
const dbl = new DBL(config.dbl, client);


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
      status: 'online',
      activity: {
        name: estado,
        type: 'WATCHING'
      },
    });
  }, 20000);

  await client.guilds.cache.keyArray().forEach(id => {
    prefixSchema.findOne({
      guildID: id
    }, (err, guild) => {
      if(err) console.error(err)
      if(!guild){
        const newschema = new prefixSchema({
          guildID: id,
          prefix: '>'
        })
        return newschema.save()
      }
    });
  })
  require('snekfetch').post(`https://thlist.glitch.me/api/stats/bot/676258423620370443`)
  .send({ serverCount: client.guilds.cache.size, authorization: "XA-5vPfRMfGMZby"})
  .set("Content-Type", "application/json")
  .catch(err => console.error(`Error al enviar datos: ${err}`));
  console.log('Se han enviado los datos!')
  
  setInterval(() => {
    dbl.postStats(client.guilds.cache.size);
  }, 1800000);
}
