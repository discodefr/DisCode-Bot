const Discord = require('discord.js')
const fs = require('fs')

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

exports.run = (client, message, args) => {

    client.suggestchannels = JSON.parse(fs.readFileSync('./databases/suggestchannels.json', "utf8"))
    var guildprefix = client.prefdb[message.guild.id].prefix;
    var reg = /{guildprefix}/gi;
    let command = args.join(' ');
    if(command === "eval") return;
    if(client.commands.has(command) || client.aliases.has(command)) {
        if(command === "eval.js") return;
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
            .setDescription(h.description)
            .addField(`Utilisation`, h.utilis.replace(reg, guildprefix))
            .addField('Exemples', h.examples.replace(reg, guildprefix))
            .addField(a, c.aliases.join(', ') ? c.aliases.join(', ') : "Pas d'alias pour cette commande.")
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL)
        message.channel.send(he)
    }
}

exports.help = {
    name: "help"
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "aide"]
}