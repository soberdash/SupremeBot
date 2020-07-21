module.exports = async (client) => {
    const data = require("../data.json");
    const GuildSchema = require("../models/guild.js");
    const DBL = require("dblapi.js");
    const dbl = new DBL(data.token.dbl, client);

    let Console = console;
    let display = [
        "https://www.supremeproject.me",
        "https://discord.supremeproject.me",
        "#Stay at home!",
        `${client.guilds.cache.size} guilds!`,
        `${client.users.cache.size} users!`
    ];

    let displayArg = Math.floor(((Math.random() * display.length) + 1) - 1);

    setInterval(() => {
        client.user.setPresence(
            {
                status: "online",
                activity: {
                    name: display[displayArg],
                    type: "WATCHING"
                }
            }
        );
    }, 30 * 1000);

    await client.guilds.cache.keyArray().forEach((id) => {
        GuildSchema.findOne({
            guildID: id
        }, (err, guild) => {
            if(err) {
                Console.error(err);
                return;
            }
            if(!guild) {
                const newGuildSchema = new GuildSchema({
                    guildID: id,
                    prefix: ">"
                });
                return newGuildSchema.save();
            }
        });
    });

    require("snekfetch").post("https://thlist.glitch.me/api/stats/bot/676258423620370443")
        .send({ serverCount: client.guilds.cache.size, authorization: "XA-5vPfRMfGMZby"})
        .set("Content-Type", "application/json")
        .catch((err) => {
            Console.error(`Error al enviar datos: ${err}`);
        });
    Console.log("Se han enviado los datos a TH List!");

    setInterval(() => {
        dbl.postStats(client.guilds.cache.size);
    }, 1800000);
};

