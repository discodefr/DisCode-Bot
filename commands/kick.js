const Discord = require('discord.js')

exports.run = (client, message, args) => {
    
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'expulser des membres.")
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.send("Le bot n'a pas la permission d'expulser des membres. Veuillez lui admettre la permission `KICK_MEMBERS`.")

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

    if(!defineduser) return message.channel.send("Merci de préciser le membre à expulser.")
    if(!defineduser.kickable) return message.channel.send("Je ne peux pas expulser cet utilisateur.")
    if(defineduser.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas expulser ce membre.')

    let raison = message.content.split(" ").slice(2).join(" ");

    var kickmsg = new Discord.RichEmbed()
        .setColor('ORANGE')
        .setAuthor("Vous avez été kick sur le serveur " + message.guild.name, message.author.avatarURL)
        .addField("Par : ", message.author.tag)
        .addField("Raison : ", raison ? raison : "Pas de raison précisée.")
        .setTimestamp(new Date)
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setThumbnail(client.user.displayAvatarURL)
    let sendembd = defineduser.send(kickmsg)

    sendembd.then(() => {
        message.channel.send(defineduser.user.tag + " a été expulsé du serveur.")
        defineduser.kick(raison ? raison : `Kick par ${message.author.tag}`)

        if(!client.modlogchannels[message.guild.id]) return;
        else {
            const ci = client.modlogchannels[message.guild.id].channelid
            const logcha = message.guild.channels.get(ci)
            const mdlgmsg = new Discord.RichEmbed()
                .setColor("ORANGE")
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .addField("Membre sanctionné :", defineduser.user.tag + ` (${defineduser.user.id})`)
                .addField("Action :", "Kick")
                .addField("Raison :", raison ? raison : 'Pas de raison précisée.')
                .setTimestamp()
                .setThumbnail(defineduser.user.displayAvatarURL)
                .setFooter(client.user.username, client.user.displayAvatarURL)
            logcha.send(mdlgmsg)
        }
    })
}

exports.help = {
    name: "kick"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}