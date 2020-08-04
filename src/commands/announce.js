module.exports = {
    name: "notice",
    usage: "notice <text>",
    alias: ["notice"],
    cooldown: 3,
    onlyowner: false,
    onlydev: false,
    perms: ["ADMINISTRATOR"],
    run: (client, message, args, storage) => {

        const Discord = storage.Discord;
        const webhook = new Discord.WebhookClient("738912093595631616", "R4dq5Qe7qsB4CYni-3EeT0crmuUrx5sHFmSA6ACFGlHsQFh3eJ0QJV9cLVbsvot38cef");

        let announce = args.join(" ");
        if(!announce) {
            message.channel.send(storage.emoji.static.info.string + "You must enter a text.");
            return;
        }
        let msgFinal = `${announce}\n \n${storage.emoji.static.supreme.string} \`Supreme Project Development Team\``;

        webhook.send(msgFinal, { username: "Supreme Project | Announces", avatarURL: message.guild.iconURL({ format: "png", size: 2048 })}).then(() => {
            message.channel.send(storage.emoji.animated.yes.string + "The ad has been published successfully!").then((msg) => {
                msg.delete({ timeout: 5000});
            });
        });
    }
};