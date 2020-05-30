const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const mongoose = require('mongoose')
const uri = config.connect

let fs = require('fs');

client.comandos = new Discord.Collection();

fs.readdir(__dirname + "/comandos", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        return console.log("Sin comandos.");
    }

    console.log(`${jsfiles.length} comandos!`);
});


for(const file of fs.readdirSync('./comandos/')){
   if(file.endsWith(".js")){
   let fileName = file.substring(0, file.length -3);
   let fileContents = require(`./comandos/${file}`);
   client.comandos.set(fileName, fileContents);
   delete require.cache[require.resolve(`./comandos/${fileName}.js`)];
   }
}
for(const file of fs.readdirSync('./eventos')){
  if(file.endsWith(".js")){
  let fileName = file.substring(0, file.length -3);
  let fileContents = require(`./eventos/${file}`);
  client.on(fileName, fileContents.bind(null, client));
  delete require.cache[require.resolve(`./eventos/${file}`)];
  }
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, async(err) => {
    if(err) {
        console.error(`Error al conectar a la base de datos. (${err})`);
        return process.exit(1);
    }
    console.log('SupremeBot se ha conectado a la base de datos.');
});



client.login(config.token)
    .then(() => {
        console.log(`${client.user.tag} se ha conectado a Discord correctamente!.`);
    })
    .catch((err) => {
        console.error('Error al iniciar sesión: '+err);
    });

