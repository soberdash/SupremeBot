const Discord = require("discord.js")

module.exports = async(client, reaction, user) => {

    const emoji = require("../utils/emoji.json")

    const javascript = emoji.static.js.id;
    const web = emoji.static.web.id;
    const java = emoji.static.java.id;

    const channel = client.channels.cache.get("722262887409648035"); 
    const message = await channel.messages.fetch("739175797117681682")

    //Js
    if (reaction.emoji.id == javascript && reaction.message.id == message.id) {
        var member = await reaction.message.guild.members.fetch(user.id);
        if(reaction.message.guild.channels.cache.find(c => c.name == `ticket-js-${user.username}`)) return;
        reaction.message.guild.channels.create("ticket-js-" + user.username, {
            type: "text",
            permissionOverwrites: [
              {
                id: reaction.message.guild.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
              },
              {
                id: user.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
              }
            ],
          parent: "738104068857135116"
        });
    }

    //Web
    if (reaction.emoji.id == web && reaction.message.id == message.id) {
        var member = await reaction.message.guild.members.fetch(user.id);
        if(reaction.message.guild.channels.cache.find(c => c.name == `ticket-web-${user.username}`)) return;
        reaction.message.guild.channels.create("ticket-web-" + user.username, {
            type: "text",
            permissionOverwrites: [
              {
                id: reaction.message.guild.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
              },
              {
                id: user.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
              },
              {
                id: "361002687036391424", //Panda
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
              }
            ],
          parent: "738104068857135116"
        });
    }

    //Java
    if (reaction.emoji.id == java && reaction.message.id == message.id) {
      var member = await reaction.message.guild.members.fetch(user.id);
      if(reaction.message.guild.channels.cache.find(c => c.name == `ticket-java-${user.username}`)) return;
      reaction.message.guild.channels.create("ticket-java-" + user.username, {
          type: "text",
          permissionOverwrites: [
            {
              id: reaction.message.guild.id,
              deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            },
            {
              id: user.id,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            },
            {
              id: "364092561532518401", //Benja
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            },
            {
              id: "421473665381695490", //Cassha
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            }
          ],
        parent: "738104068857135116"
      });
  }

}