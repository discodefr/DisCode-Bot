const Discord = require('discord.js')
const moment = require('moment')
moment.locale('fr')

exports.run = (client, message) => {

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    const guildIcon = message.guild.iconURL.split('.jpg')[0] + '.png'

    var orderroles = message.guild.roles.sort((x, y) => y.position - x.position).map(role => role.name).join(', ');
    if(orderroles.length > 1000) {
        orderroles = `Trop de rôles. (${message.guild.roles.array().length} roles)`
    }

    var allbots = message.guild.members.filter(sizebots => sizebots.user.bot === true)
    var o = message.guild.members.filter(onlinesize => onlinesize.presence.status === "online")
    var idle = message.guild.members.filter(i => i.presence.status === 'idle')
    var dnd = message.guild.members.filter(dnd => dnd.presence.status === "dnd")
    var olc = o.size + idle.size + dnd.size - allbots.size

    var emoteslist;
    if(message.guild.emojis.array().join(" ").length > 1000) {
        emoteslist = `Trop d'emojis (${message.guild.emojis.array().length})`
    } else {
        emoteslist = message.guild.emojis.array().join(" ")
    }

    let servercreatedatef = moment(message.guild.createdAt).format("DD/MM/YY HH:mm:ss");
    let servercreatedatefr = servercreatedatef.substring(0,1).toLocaleUpperCase() + servercreatedatef.substring(1);

    var si_embed = new Discord.RichEmbed()
        .setColor('186bbe')
        .setAuthor(message.guild.name, guildIcon)
        .setThumbnail(guildIcon)
        .addField('Propriétaire du serveur', message.guild.owner.user.tag, true)
        .addField('ID', message.guild.id, true)
        .addField('Membres', message.guild.memberCount, true)
        .addField('Humains', message.guild.memberCount - allbots.size, true)
        .addField('Bots', allbots.size, true)
        .addField('En ligne', olc, true)
        .setTimestamp(new Date)
        .addField("Nombre de canaux ", message.guild.channels.size, true)
        .addField("Nombre de rôles ", message.guild.roles.size, true)
        .addField('Création du serveur ', servercreatedatefr, true)
        .addField('Région du serveur ', message.guild.region, true)
        .addField('Liste des rôles', orderroles)
        .addField("Liste des emojis", emoteslist)
        .setFooter(client.user.username, client.user.displayAvatarURL)
    message.channel.send(si_embed)

}

exports.help = {
    name: "serverinfo",
    description: "Donne des informations sur le serveur actuel",
    utilis: 'Pour se servir de cette commande, faites\n\n`{guildprefix}serverinfo`',
    examples: '{guildprefix}serverinfo',
    thumbn: 'https://p0.storage.canalblog.com/06/21/1301665/99112564_o.png'
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["si", "infoserveur"]
}