const Discord = require('discord.js')
const config = require('../config.json')

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

exports.run = (client, message, args) => {

    var prefix;
	if (message.channel.type === `dm` || !client.prefdb[message.guild.id]) prefix = config.prefix
    else prefix = client.prefdb[message.guild.id].prefix;
    var guildprefix = prefix
    var reg = /{guildprefix}/gi;
    let command = args.join(' ');
    if(client.commands.has(command) || client.aliases.has(command)) {
        if(command === "eval"|| command === "reload" || command === "ev") return;
        command = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        let h = command.help
        let c = command.conf
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
        message.channel.send(he)
    }
}

exports.help = {
    name: "help"
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    requiredArgs: false,
    aliases: ["h", "aide"]
}