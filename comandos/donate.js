module.exports = (client, message, args) => {
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed()
      .setTitle('SupremeBot')
      .setThumbnail('https://media.giphy.com/media/U1aK8ThqTBV3dqUWrR/giphy.gif')
      .setColor('RANDOM')
      .setDescription('Bienvenido a esta sección! Creo que está de más decir para que sirve, aunque lo haré de todas formas. Acá puedes colaborar con nuestro proyecto donando para mejoras en nuestros sistemas. Además, al donar obtendrás beneficios que no tienen los usuarios comúnes, los cuales te detallo acá abajo.')
      .addField('Beneficios', '- Rol **DONADOR** en nuestro Discord de Soporte\n- Comandos exclusivos del rango Donador\n- Poder sugerir funciones con más eficacia que un usuario común\n- Posibilidad de elegir ``1 función custom`` (Teniendo sentido común)')
      .addField('Requisitos', '- Pertenecer al grupo de Soporte (``>discord``)\n- Donar como mínimo **$1.00**')
      .addField('Instrucciones', '- Debes dirigirte a la página de donación: [[Link Paypal]](https://paypal.me/supremebt)\n- Al hacer la transferencia, debes dejar un comentario especificando **tu Nick y tu Discriminador (XXXX#1234), y tu ID (123456789876543210). Esto es OBLIGATORIO.**\n- Esperar a que se te asigne el rol, si no se asigna pasados dos días comunícate conmigo.')
      .setFooter('SupremeBot')
    message.channel.send(embed)
  };
  