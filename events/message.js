const config = require('../config.json')
const fs = require('fs')

exports.run = (client, message) => {

    if(message.author.bot || message.author.id === client.user.id || message.channel.type === 'group') return;

    var prefix;
	if (message.channel.type === `dm` || !client.prefdb[message.guild.id]) prefix = config.prefix
    else prefix = client.prefdb[message.guild.id].prefix;

    if(message.content.toLowerCase() === "<@484734900461895681> prefix") {
        message.channel.send(`Mon prefix sur ce serveur est \`${prefix}\` !`)
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	var cmd;
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    } else if (!client.aliases.has(command)) return;

    if (cmd.conf.enabled === false) return message.channel.send(`Commande désactivée... :zzz:`);
    if (cmd.conf.guildOnly === true && message.channel.type === `dm`) return message.channel.send(`Commande réservée aux serveurs !`);

    if (cmd) {
        try {
        cmd.run(client, message, args);
        }
        catch (e) {
            console.error(e.stack);
            message.channel.send(`Une erreur est survenue. Si le problème persiste, merci de contacter le support du bot ou d'effectuer la commande ${prefix}report {votre report}.`);
        }
    };

}