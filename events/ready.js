module.exports = (client) => {
    let display = [
        "https://www.supremeproject.me",
        "https://discord.supremeproject.me",
        "#Stay at home!",
        `${client.guilds.cache.size} guilds!`,
        `${client.users.cache.size} users!`
    ];

    let displayArg = Math.floor(((Math.random() * display.length) + 1) - 1);
    let final = display[displayArg]

    setInterval(() => {
        client.user.setPresence(
            {
                status: "online",
                activity: {
                    name: numberArg,
                    type: "WATCHING"
                }
            }
        );
    }, 30 * 1000);
};