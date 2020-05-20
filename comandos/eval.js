module.exports = (client, message, args) => {
    const Discord = require('discord.js')
    if(!["540294552372772884", "431571345050959872"].includes(message.author.id)) return message.channel.send('<a:ani_no:709633289106882590> No tienes permisos para realizar esta acción.');
    if(!args.join(' ')) return message.channel.send('<a:ani_no:709633289106882590>  Debes escribir lo que quieres evaluar')
    let limit = 1950;
    try {
      let code = args.join(' ');
      let evalued = eval(code);
      if (typeof evalued !== "string")
      evalued = require("util").inspect(evalued);
      let txt = "" + evalued;
      if (txt.length > limit) {
        message.channel.send(`\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``);
      } else
        message.channel.send(`\`\`\`js\n ${txt}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
    }
  }