const Discord = require('discord.js')
const moment = require('moment')
moment.locale('fr')

exports.run = (client, message, args) => {

    let currentdate = new Date
    let cdf = moment(currentdate).format(`dddd Do MMMM YYYY, HH:mm:ss`);
    var warndate = cdf.substring(0, 1).toLocaleUpperCase() + cdf.substring(1);

    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'avertir des membres.")
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.send("Le bot n'a pas la permission d'avertir des membres. Veuillez lui admettre la permission `KICK_MEMBERS`.")

    var defineduser;

    if(message.guild.members.some(usr => usr.id === args[0])) {
        defineduser = message.guild.members.get(args[0])
    }
    else if(message.mentions.members.first()) {
        defineduser = message.mentions.members.first()
    }
    else if(message.guild.members.some(usr => usr.user.username === args.join(" "))) {
        defineduser = message.guild.members.find(usr => usr.user.username === args.join(" "))
    }
    else if(defineduser === undefined) {
        return message.channel.send("L'utilisateur demandé n'existe pas. Essayez avec l'identifiant, le nom ou la mention.")
    }

    if(!defineduser) return message.channel.send("Merci de préciser le membre à avertir.")
    if(!defineduser.kickable) return message.channel.send("Vous ne pouvez pas avertir cet utilisateur.")

    let raison = message.content.split(" ").slice(2).join(" ");
    if(!raison) return message.channel.send("Merci de préciser une raison.")

    var warnmsg = new Discord.RichEmbed()
        .setColor('FFFF00')
        .setTitle("Vous avez été **warn** sur le serveur " + message.guild.name)
        .addField("Par : ", message.author.username + "#" + message.author.discriminator)
        .addField("Raison : ", raison)
        .setTimestamp(new Date)
        .setFooter(client.user.username, client.user.avatarURL)
        .setThumbnail(client.user.avatarURL)
    let sendembd = defineduser.send(warnmsg)

    sendembd.then(() => {
        message.channel.send(`${defineduser.user.tag} a été averti.`)
        if(!client.warns.has(defineduser.id)) {
            client.warns.set(defineduser.user.id, {
                reason: raison,
                date: warndate
            })
        }
        if(!client.modlogchannels.has(message.guild.id)) return;
        const modlog = client.modlogchannels.get(message.guild.id, `channelid`)
        const logcha = message.guild.channels.find(cha => cha.id === modlog)

        const mdlgmsg = new Discord.RichEmbed()
            .setColor("FFFF00")
            .setAuthor(message.author.tag, message.author.avatarURL)
            .addField("Membre sanctionné :", defineduser.user.tag + ` (${defineduser.user.id})`)
            .addField("Action :", "Warn")
            .addField("Raison :", raison)
            .setTimestamp()
            .setThumbnail(defineduser.user.avatarURL)
            .setFooter(client.user.username, client.user.avatarURL)
            logcha.send(mdlgmsg)
    })
}

exports.help = {
    name: "warn"
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["advert"]
}