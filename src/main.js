const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const data = require("./data.json");

/*
const DBL = require("dblapi.js")
const dbl = new DBL(data.token.dbl, client);
*/

const { Console } = require("console");
let Log = new Console({ stdout: process.stdout, stderr: process.stderr });
let fs = require("fs");

client.commands = new Discord.Collection();

const commands = fs.readdirSync("./commands").filter((x) => x.endsWith(".js"));
if(!commands.length) {
    Log.log("Sin comandos");
} else {
    Log.log(`Cargando ${commands.length} comandos...`);

    commands.forEach((file) => {
        client.commands.set(require("./commands/"+file).name, require("./commands/"+file));
        Log.log(`Comando ${file.name} cargado.`);
        delete require.cache[require.resolve("./commands/"+file)];
    });
}

const events = fs.readdirSync("./events").filter((x) => x.endsWith(".js"));
if(!events.length)  {
    Log.log("Sin eventos");
} else {
    Log.log(`Cargando ${events.length} eventos...`);

    events.forEach((file) => {
        client.on(file.slice(0, file.length-3), require("./events/"+file).bind(null, client));
        Log.log(`Evento ${file.slice(0, file.length-3).toUpperCase()} cargado`);
        delete require.cache[require.resolve(`./events/${file}`)];
    });
}

let uri = `mongodb://${data.database.username}:${data.database.password}@${data.database.url}/supremebot?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function(err) {
    if(err) {
        Log.error(`Ha ocurrido un error al conectar con la base de datos.\n${err}`);
        process.exit(1);
        return;
    }
    Log.log(`Conectado correctamente a ${data.database.url} (MongoDB)`);
});

/*
dlb.on('posted', () => {
    Console.log("Los datos se han enviado a DBL correctamente")
})

dbl.on('error', (e) => {
    Console.log(`Ha ocurrido un error al enviar los datos a DBL. (${e})`);
})

*/

client.login(data.token.discord).then(() => {
    Log.log(`Sesión iniciada en ${client.user.tag}.`);
}).catch((err) => {
    Log.error(`Ha ocurrido un error al iniciar sesión. \n${err}`);
});
