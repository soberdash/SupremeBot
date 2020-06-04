module.exports = async (client, message, args, prefix) => {
    const Discord = require('discord.js')
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle('SupremeBot | Ayuda')
      .setDescription('Acá puedes encontrar las categorías de ayuda.\nReacciona al emote indicado para ver los comandos.\n \n**Categorias:**\n \n<:settings:701258193904336976> Configuración\n \n<:information:701258135582670848> Información\n \n<:discordstaff:701258193522917427> Moderación\n \n<:potion:701258135440064585> Utilidades\n \n<:bughunter:701258191954116640> Diversión')
      .setColor('RANDOM')
      .setFooter('Este mensaje tiene 60 segundos de utilidad. Luego de ese tiempo, las reacciones se autoeliminarán')
    let mensaje = await message.channel.send(embed).then(async(msg) => {
      await msg.react(client.emojis.resolve('701258193904336976'))
      await msg.react(client.emojis.resolve('701258135582670848'))
      await msg.react(client.emojis.resolve('701258193522917427'))
      await msg.react(client.emojis.resolve('701258135440064585'))
      await msg.react(client.emojis.resolve('701258191954116640'))
      
      const filter0 = (reaction, user) => reaction.emoji.id === '701258193904336976' && user.id !== client.user.id && user.id == message.author.id
      const filter1 = (reaction, user) => reaction.emoji.id === '701258135582670848' && user.id !== client.user.id && user.id == message.author.id
      const filter2 = (reaction, user) => reaction.emoji.id === '701258193522917427' && user.id !== client.user.id && user.id == message.author.id
      const filter3 = (reaction, user) => reaction.emoji.id === '701258135440064585' && user.id !== client.user.id && user.id == message.author.id
      const filter4 = (reaction, user) => reaction.emoji.id === '701258191954116640' && user.id !== client.user.id && user.id == message.author.id
      
      const colector0 = msg.createReactionCollector(filter0, { time: 60000 });
      const colector1 = msg.createReactionCollector(filter1, { time: 60000 });
      const colector2 = msg.createReactionCollector(filter2, { time: 60000 });
      const colector3 = msg.createReactionCollector(filter3, { time: 60000 });
      const colector4 = msg.createReactionCollector(filter4, { time: 60000 });
      
      colector0.on('collect', async (reaction) => {
        const embed = new Discord.MessageEmbed()
          .setTitle('SupremeBot | Ayuda')
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setDescription('Sección de Comandos de Configuración.\n{} = Obligatorio\n[] = Opcional\n() = Para Moderadores')
          .addField(`**${prefix}set**`, 'Para configurar funciones del bot. Para más información utiliza dicho comando.')
          .addField(`**${prefix}unset**`, 'Para deshacer acciones del comando '+'``'+`${prefix}set`+'``'+'. Para más información utiliza dicho comando.')
          .addField(`**${prefix}niveles (set)**`, 'Muestra los roles establecidos para el leveling del servidor, y establece los roles para ellos.')
          .addField(`**${prefix}verificar {discriminador}**`, 'Sistema de verificación de usuarios. Para más información usa '+'``'+`${prefix}set`+'``')
          .setColor('RANDOM')
          .setFooter('Este mensaje tiene 60 segundos de utilidad. Luego de ese tiempo, las reacciones se autoeliminarán')
        msg.edit(embed)
        reaction.users.remove(message.author.id);
      })
      colector1.on('collect', async (reaction) => {
        const embed = new Discord.MessageEmbed()
          .setTitle('SupremeBot | Ayuda')
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setDescription('Sección de Comandos de Información.')
          .addField(`**${prefix}help**`, 'Despliega la información de los comandos.')
          .addField(`**${prefix}info**`, 'Despliega la información del bot.')
          .addField(`**${prefix}novedades**`, 'Muestra las novedades de la última actualización del bot.')
          .addField(`**${prefix}stats**`, 'Muestra las estadísticas del bot.')
          .addField(`**${prefix}ping**`, 'Da la información sobre el ping de mensajes, y de la API.')
          .addField(`**${prefix}donate**`, 'Despliega la información de donación.')
          .addField(`**${prefix}vote**`, 'Muestra la información de votos para el bot.')
          .setColor('RANDOM')
          .setFooter('Este mensaje tiene 60 segundos de utilidad. Luego de ese tiempo, las reacciones se autoeliminarán')
        msg.edit(embed)
        reaction.users.remove(message.author.id);
      })
      colector2.on('collect', async (reaction) => {
        const embed = new Discord.MessageEmbed()
          .setTitle('SupremeBot | Ayuda')
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setDescription('Sección de Comandos de Moderación.\nTodos requieren permisos para usarse.\n{} = Obligatorio\n[] = Opcional')
          .addField(`**${prefix}warn {usuario} {razón}**`, 'Advierte a un usuario. (Automoderación incluida, para más info utiliza '+'``'+`${prefix}set`+'``'+').')
          .addField(`**${prefix}kick {usuario} {razón}**`, 'Kickea a un usuario del servidor.')
          .addField(`**${prefix}ban {usuario} {razón}**`, 'Banea a un usuario del servidor.')
          .addField(`**${prefix}unban {iddelusuario}**`, 'Desbanea a un usuario del servidor.')
          .addField(`**${prefix}sclear {warn|kick|ban} {all|one} {usuario}**`, 'Elimina sanciones del registro del usuario. (Para historial de advertencias, solo será eliminado si se hace un clear de todas las advertencias.)')
          .addField(`**${prefix}purge {cantidad}**`, 'Elimina mensajes (Cantidades menores a 100).')
          .addField(`**${prefix}anuncio {mensaje}**`, 'Da un anuncio en el servidor. (Canal y mención customizables, para más info utiliza '+'``'+`${prefix}set`+'``'+').')
          .setColor('RANDOM')
          .setFooter('Este mensaje tiene 60 segundos de utilidad. Luego de ese tiempo, las reacciones se autoeliminarán')
        msg.edit(embed)
        reaction.users.remove(message.author.id);
      })
      colector3.on('collect', async (reaction) => {
        const embed = new Discord.MessageEmbed()
          .setTitle('SupremeBot | Ayuda')
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setDescription('Sección de Comandos de Utilidades.')
          .addField(`**${prefix}sanciones**`, 'Muestra las sanciones del usuario autor o del mencionado.')
          .addField(`**${prefix}warns**`, 'Muestra la lista de advertencias del usuario autor, o del mencionado.')
          .addField(`**${prefix}rep**`, 'Da puntos de reputación a los usuarios cada 24 horas.')
          .addField(`**${prefix}user**`, 'Despliega la información del usuario autor, o del mencionado.')
          .addField(`**${prefix}rank**`, 'Muestra el nivel del usuario autor, o del usuario mencionado.')
          .addField(`**${prefix}top**`, 'Muestra el top de usuarios con más xp en el servidor.')
          .addField(`**${prefix}say**`, 'Envía un un mensaje con lo que el usuario escriba (Para usuarios con permisos de mencionar ``everyone`` y ``here``, el bot lo mencionará, para usuarios sin permisos no).')
          .addField(`**${prefix}avatar**`, 'Muestra el avatar del usuario autor, o del mencionado.')
          .addField(`**${prefix}svinfo**`, 'Muestra la información del servidor.')
          .addField(`**${prefix}img**`, 'Busca imágenes en internet.')
          .setColor('RANDOM')
          .setFooter('Este mensaje tiene 60 segundos de utilidad. Luego de ese tiempo, las reacciones se autoeliminarán')
        msg.edit(embed)
        reaction.users.remove(message.author.id);
      })
      colector4.on('collect', async (reaction) => {
        const embed = new Discord.MessageEmbed()
          .setTitle('SupremeBot | Ayuda')
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setDescription('Sección de Comandos de Diversión')
          .addField(`**${prefix}marry**`, 'Cásate con alguien (La información se despliega en el comando '+'``'+`${prefix}user`+'``'+').')
          .addField(`**${prefix}divorce**`, 'Divórciate de tu pareja.')
          .addField(`**${prefix}love**`, 'Muestra el porcentaje de amor del autor y del mencionado.')
          .addField(`**${prefix}8ball**`, 'Realizale preguntas al bot!')
          .addField(`**${prefix}berenjena**`, 'Muestra el tamaño de tu berenjena, o la del usuario mencionado.')
          .addField(`**${prefix}contagiar**`, 'Contagia a alguien con COVID-19.')
          .addField(`**${prefix}meme**`, 'Muestra un meme random.')
          .addField(`**${prefix}rloli**`, 'Muestra una imagen de una loli random.')
          .addField(`**${prefix}kiss**`, 'Demuestra tu amor con un beso.')
          .addField(`**${prefix}hug**`, 'Abraza a alguien.')
          .addField(`**${prefix}pat**`, 'Acaricia a alguien.')
          .setColor('RANDOM')
          .setFooter('Este mensaje tiene 60 segundos de utilidad. Luego de ese tiempo, las reacciones se autoeliminarán')
        msg.edit(embed)
        reaction.users.remove(message.author.id);
      })
      setTimeout(async() => {
        msg.reactions.removeAll();
      }, 60000)
    })
  }