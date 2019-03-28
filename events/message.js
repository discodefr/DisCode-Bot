const config = require('../config.json')
const Discord = require('discord.js')

exports.run = (client, message) => {

    if(message.author.bot || message.author.id === client.user.id || message.channel.type === 'group') return;

    var prefix;
	if (message.channel.type === `dm` || !client.prefdb[message.guild.id]) prefix = config.prefix
    else prefix = client.prefdb[message.guild.id].prefix;

    if(message.content.toLowerCase() === "<@484734900461895681> prefix") {
        return message.channel.send(`Mon prefix sur ce serveur est \`${prefix}\` !`)
    }

    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const rprefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : prefix;

    if (!message.content.startsWith(rprefix)) return;

    const args = message.content.slice(rprefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	var cmd;
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    } else if (!client.aliases.has(command)) return;
    
    if (cmd.conf.enabled === false) return message.channel.send(`Commande désactivée... :zzz:`);
    if (cmd.conf.guildOnly === true && message.channel.type === `dm`) return message.channel.send(`Commande réservée aux serveurs !`);
    
    if(cmd.conf.requiredArgs === true && !args[0]) {
        if(cmd.help.name === 'poll' && !message.member.hasPermission('ADMINISTRATOR')) return;
        var guildprefix = prefix
        var reg = /{guildprefix}/gi;
        let h = cmd.help
        let c = cmd.conf
        var a;
        if(c.aliases.length === 1 || c.aliases.length === 0) {
            a = "Alias"
        } else if(c.aliases.length > 1) {
            a = "Aliases"
        }
        const he = new Discord.RichEmbed()
            .setAuthor(`Commande : ${h.name}`, h.thumbn)
            .setColor(client.ecolor)
            .setThumbnail(h.thumbn)
            .setDescription(h.description + '\n*__Note :__ Le texte entre parenthèses est obligatoire, et le texte entre crochets est optionnel.*')
            .addField(`Utilisation`, h.utilis.replace(reg, guildprefix))
            .addField('Exemples', h.examples.replace(reg, guildprefix))
            .addField(a, c.aliases.join(', ') ? c.aliases.join(', ') : "Pas d'alias pour cette commande.")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
        return message.channel.send(he)
    }

    if (cmd) {
        try {
        cmd.run(client, message, args);
        }
        catch (e) {
            const rg = client.guilds.get('467258216485617664')
            const rc= rg.channels.get('530375912118681610')
            rc.send(`Erreur sur la commande ${cmd.help.name} :\n\n\`\`\`${e.stack.toString()}\`\`\``)
            message.channel.send(`Une erreur est survenue. Si le problème persiste, merci de contacter le support du bot ou d'effectuer la commande ${prefix}report {votre report}.`);
        }
    };

}