module.exports = (client, message) => {
  const prefix = ">"
  if (!message.content.startsWith(prefix)) return
  if (message.author.bot) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command.length === 0) return;
  let cmd = client.comandos.get(command);
  if (!cmd) return;
  cmd(client, message, args, prefix, Discord);
}
