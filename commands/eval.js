module.exports = (client, message, args) => {
    const Discord = require('discord.js')
    if(!["540294552372772884", "431571345050959872"].includes(message.author.id)) return message.channel.send('<a:ani_no:709633289106882590> No tienes permisos para realizar esta acción.');
    if(!args.join(' ')) return message.channel.send('<a:ani_no:709633289106882590>  Debes escribir lo que quieres evaluar')
    let limit = 1024;
    try {
      let code = args.join(' ');
      let evalued = eval(code);
      if (typeof evalued !== "string")
        evalued = require("util").inspect(evalued);
      let txt = "" + evalued;
      if (txt.length > limit) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
		.setTitle('SupremeBot | Eval')
        .addField("Entrada", `\`\`\`js\n${code}\n\`\`\``)
        .addField("Salida", '``Siguiente mensaje``')
        .setColor("RANDOM")
        .setFooter('SupremeBot')
        message.channel.send(embed);
		message.channel.send(`\`\`\`js\n ${txt.slice(0, 1950)}\n\`\`\``);
      } else
        var embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
		.setTitle('SupremeBot | Eval')
        .addField("Entrada", `\`\`\`js\n${code}\n\`\`\``)
		.addField("Salida", `\`\`\`js\n ${txt}\n\`\`\``)
        .setColor("RANDOM")
        .setFooter('SupremeBot')
        message.channel.send(embed);
    } catch (err) {
      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
	  .setTitle('SupremeBot | Error')
      .addField("Entrada", `\`\`\`js\n${code}\n\`\`\``)
      .addField("Salida", `\`\`\`js\n${err}\n\`\`\``)
      .setColor("RANDOM")
      .setFooter('SupremeBot')
      message.channel.send(embed);
  }
  }