module.exports = async (client, message, args) => {
    if(message.author.bot) return;
    const Discord = require('discord.js')
    var ids = ['540294552372772884', "431571345050959872"]
    
    if(!ids.some(ids => message.author.id == ids)) return message.channel.send('<a:ani_no:709633289106882590> No tienes permisos para realizar esta acción.');
    if(!args[0]){
      const exec = require('child_process').execSync
        console.log(`Reinicio completo`)
        message.channel.send('<a:ani_yes:709633371122434050> Reiniciando procesos. En línea en unos momentos.').then(() => {
        exec('pm2 reload 0 --force');
      })
    }else{
      const argsName = args[0]
      if(!argsName) {
        return message.channel.send(`<a:ani_no:709633289106882590> Debes de proporcionar el nombre del archivo del comando a reiniciar.`)
      }
      const nameCmd = argsName.toLowerCase();
      const command = client.comandos.get(nameCmd)
      try {
        const reloadedCmd = require(`./commands/${nameCmd}.js`);
        client.comandos.set(nameCmd, reloadedCmd)
        client.comandos.delete(nameCmd)
        client.comandos.set(nameCmd, reloadedCmd);
        message.channel.send(`<a:ani_yes:709633371122434050> El comando \`${nameCmd}\` ha sido reiniciado correctamente.`);
        delete require.cache[require.resolve(`./commands/${nameCmd}.js`)];
      } catch (error) {
        message.channel.send(`<a:ani_no:709633289106882590> Ha ocurrido un error al reiniciar el comando \`${nameCmd}\`\n`+'```js\n'+error+'```');
      }  
    }
  }