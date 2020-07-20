const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const data = require("./data.json");
/*
const DBL = require("dblapi.js")
const dbl = new DBL(data.token.dbl, client);
*/

let Console = console;
let fs = require("fs");

client.commands = new Discord.Collection();

fs.readdirSync(__dirname + "/commands", (err, files) => {
    if(err) {
        Console.error(err);
        return;
    }

    let jsfiles = files.filter((f) => f.split(".").pop() === "js");
    if(jsfiles.length < 0) {
        Console.log("Sin comandos");
        return;
    }

    Console.log(`Cargando ${jsfiles.length} comandos.`);

    jsfiles.forEach((f, i) => {
        let fileName = f.substring(0, f.length - 3);
        let fileContents = require("./commands/" + f);
        Console.log(`Comando ${f} cargado`);
        client.commands.set(fileName, fileContents);
        delete require.cache[require.resolve(`./commands/${fileName}.js`)];
    });
});

for(const file of fs.readdirSync("./events")) {
    if(file.endsWith("js")) {
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require("./events/" + file);
        client.on(fileName, fileContents.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    }
}

let uri = `mongodb+srv://${data.database.username}:${data.database.password}@${data.database.url}`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, async(err) => {
    if(err) {
        Console.error(`Ha ocurrido un error al conectar a la base de datos. (${err})`);
        process.exit(1);
        return;
    }
    Console.log(`${client.user.tag} se ha conectado a la base de datos correctamente.`);
});

/*
dlb.on('posted', () => {
    console.log("Los datos se han enviado a DBL correctamente")
})

dbl.on('error', e => {
    console.log(`Ha ocurrido un error al enviar los datos a DBL. (${e})`);
})

*/

client.login(data.token.discord).then(() => {
    Console.log(`${client.user.tag} se ha conectado a Discord correctamente.`);
}).catch((err) => {
    Console.error(`Ha ocurrido un error al conectar. (${err})`);
});