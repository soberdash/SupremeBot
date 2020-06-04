const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const mongoose = require('mongoose')
const uri = config.connect
const DBL = require('dblapi.js')
const dbl = new DBL(config.dbl, client);

let fs = require('fs');

client.comandos = new Discord.Collection();

fs.readdir(__dirname + "/commands", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("Directorio sin Comandos");
        return;
    }

    console.log(`Cargando ${jsfiles.length} comandos!`);

    jsfiles.forEach((f, i) => {
        let fileName = f.substring(0, f.length -3);
        let fileContents = require(`./commands/${f}`);
        console.log(`${f} listo!`);
        client.comandos.set(fileName, fileContents);
        delete require.cache[require.resolve(`./commands/${fileName}.js`)];
    });
});

for(const file of fs.readdirSync('./events')){
  if(file.endsWith(".js")){
  let fileName = file.substring(0, file.length -3);
  let fileContents = require(`./events/${file}`);
  client.on(fileName, fileContents.bind(null, client));
  delete require.cache[require.resolve(`./events/${file}`)];
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
dbl.on('posted', () => {
  console.log('Listo! (DBL)');
})

dbl.on('error', e => {
 console.log(`Ha ocurrido un error! ${e}`);
})
