const Discord = require('discord.js')
const moment = require('moment')
moment.locale('fr')

exports.run = (client, message, args) => {

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var rl

    if(!args[0]) {
        return message.channel.send("Veuillez préciser un rôle.")
    }
    else if(message.guild.roles.some(role => role.id === args[0].toLowerCase())) {
        rl = message.guild.roles.get(args[0])
    }
    else if(message.mentions.roles.first()) {
        rl = message.mentions.roles.first()
    }
    else if(message.guild.roles.some(role => role.name === args[0].toLowerCase())) {
        rl = message.guild.roles.find(role => role.name === args[0])
    }
    else if(rl === undefined) {
        return message.channel.send("Le rôle demandé n'existe pas. Essayez avec le nom, l'identifiant ou la mention.")
    }

    var crrl = moment(rl.createdAt).format('DD/MM/YY HH:mm:ss')
    var crllfr = crrl.substring(0,1).toLocaleUpperCase() + crrl.substring(1);
    const mtnable = rl.mentionable === true ? "<:done:473803590532595712>" : "<:nope:473803719440597003>" 
    const hoist = rl.hoist === true ? "<:done:473803590532595712>" : "<:nope:473803719440597003>"
    const managed = rl.managed === true ? "<:done:473803590532595712>" : "<:nope:473803719440597003>"
    var rlmbd = new Discord.RichEmbed()
        .setAuthor("Informations sur le rôle " + rl.name, message.guild.iconURL)
        .setFooter(client.user.username, client.user.avatarURL)
        .setColor(rl.hexColor)
        .setTimestamp()
        .addField("Nom du rôle ", rl.name, true)
        .addField("ID du rôle", rl.id, true)
        .addField("Couleur du rôle", rl.hexColor, true)
        .addField("Date de création du rôle", crllfr, true)
        .addField("Position du rôle", rl.calculatedPosition, true)
        .addField("Utilisateurs avec ce rôle", rl.members.size, true)
        .addField("Mentionnable", mtnable, true)
        .addField("Hoist", hoist, true)
        .addField('Géré extérieurement', managed, true)
    message.channel.send(rlmbd)
}

exports.help = {
    name: "roleinfo",
    description: "Avoir des informations sur un rôle"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ri", "roleinfo"]
}