module.exports = {
    name: "reload",
    usage: "reload [cmd]",
    alias: ["r"],
    cooldown: 3,
    onlyowner: false,
    onlydev: true,
    perms: [],
    run: (client, message, args, storage) => {

        const Discord = require("discord.js");

        if(!args[0]) {
            const exec = require("child_process").execSync;
            storage.Log.log("Reload successfully");
            message.channel.send(storage.emoji.animated.yes.string + "Restarting the bot").then(() => {
                exec("pm2 reload 0 --force");
            }).catch((err) => {
                storage.Log.error(err);
                message.chanenl.send(storage.errorEmbed);
            });
        } else {
            const argsName = args[0];
            if(!argsName) {
                message.channel.send(storage.emojis.static.info.string + "Provides the name of the command file to restart.");
                return;
            }

            const nameCmd = argsName.toLowerCase();
            const command = client.commands.get(nameCmd);

            try {
                const reloadedCmd = require(`../commands/${nameCmd}.js`);
                client.commands.set(nameCmd, reloadedCmd);
                client.commands.delete(nameCmd, reloadedCmd);
                client.commands.set(nameCmd, reloadedCmd);
                message.channel.send(`${storage.emoji.animated.yes.string}The command \`${nameCmd}\` was successfully restarted.`);
                delete require.cache[require.resolve(`../commands/${nameCmd}.js`)];
            } catch (err) {
                message.channel.send(`${storage.emoji.animated.no.string}An error occurred while restarting the command \`${nameCmd}\`\n` + '```js\n'+err+'```');
            }
        }
    }
};