module.exports = (client, message) =>  {
    const Discord = require("discord.js");
    const guildSchema = require("./models/guild.js")
    let prefix = ">";

    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;

    const args = message.content.slice(prefix.lengt).trim().split(/ + /g);
    const command = args.shift().toLocaleLowerCase();

    let cmd = client.commands.get(command) || client.commands.cache.find(c => c.alias === command);
    if(!cmd) return;

    try {
        cmd.run(client, message, args);
    } catch(err) {
        message.channel.send();
        client.channels.resolve("691114601361702952").send(`Ha ocurrido un error al ejecutar el comando ${cmd.name}.\n`+"```js\n"+err+"\n```");
    }



}