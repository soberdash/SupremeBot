const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const data = require("../utils/data.json");

/*
const DBL = require("dblapi.js")
const dbl = new DBL(data.token.dbl, client);
*/

const { Console } = require("console");
let Log = new Console({ stdout: process.stdout, stderr: process.stderr });
let fs = require("fs");

client.commands = new Discord.Collection();

fs.readdir(__dirname + "/commands", (err, files) => {
    if(err) {
        Log.error(err);
        return;
    }

    let jsfiles = files.filter((f) => f.split(".").pop() === "js");
    if(jsfiles.length < 0) {
        Log.log("Sin comandos");
        return;
    }

    Log.log(`Cargando ${jsfiles.length} comandos.`);

    jsfiles.forEach((f, i) => {
        let fileName = f.substring(0, f.length - 3);
        let fileContents = require("./commands/" + f);
        Log.log(`Comando ${f} cargado`);
        client.commands.set(fileName, fileContents);
        delete require.cache[require.resolve(`./commands/${fileName}.js`)];
    });
});

for(const file of fs.readdirSync("./src/events")) {
    if(file.endsWith("js")) {
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require("./events/" + file);
        client.on(fileName, fileContents.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    }
}

let uri = `mongodb+srv://${data.database.username}:${data.database.password}@${data.database.url}/supremebot?retryWrites=true&w=majority`;

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
