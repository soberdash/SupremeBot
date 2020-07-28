module.exports = async (client) => {
    const data = require("../data.json");
    const GuildSchema = require("../models/guild.js");
    const DBL = require("dblapi.js");
    const dbl = new DBL(data.token.dbl, client);

    const { Console } = require("console");
    let Log = new Console({ stdout: process.stdout, stderr: process.stderr });

    let display = [
        "https://www.supremeproject.me",
        "https://discord.supremeproject.me",
        "#StayAtHome! | #StayAtSupremeProject!",
        `${client.guilds.cache.size} guilds!`,
        `${client.users.cache.size} users!`
    ];
    let numberRandom = Math.floor(Math.random() * display.length);

    setInterval(() => {
        client.user.setPresence(
            {
                status: "online",
                activity: {
                    name: display[numberRandom],
                    type: "WATCHING"
                }
            }
        );
    }, 25 * 1000);

    client.guilds.cache.map(g => g.id).forEach((id) => {
        GuildSchema.findOne({
            guildID: id
        }, (err, guild) => {
            if(err) {
                Log.error(err);
                return;
            }
            if(!guild) {
                const newGuildSchema = new GuildSchema({
                    guildID: id,
                    prefix: ">"
                });
                return newGuildSchema.save().then(() => {
                    Log.log("Se han guardado exitosamente los datos para "+client.guilds.resolve(id).name);
                }).catch((err) => {
                    Log.error("Ha ocurrido un error al guardar los datos. "+err)
                })
            }
        })
    })
    /*
    await client.guilds.cache.keyArray().forEach((id) => {
        GuildSchema.findOne({
            guildID: id
        }, (err, guild) => {
            if(err) {
                Log.error(err);
                return;
            }
            if(!guild) {

            }
        });
    });
    */
    require("snekfetch").post("https://thlist.glitch.me/api/stats/bot/676258423620370443")
        .send({ serverCount: client.guilds.cache.size, authorization: "XA-5vPfRMfGMZby"})
        .set("Content-Type", "application/json")
        .catch((err) => {
            Log.error(`Error al enviar datos: ${err}`);
        });
    Log.log("Se han enviado los datos a TH List!");

    setInterval(() => {
        dbl.postStats(client.guilds.cache.size);
    }, 1800000);
};

