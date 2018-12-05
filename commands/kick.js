const Discord = require('discord.js')

exports.run = (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'expulser des membres.")
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
    if(!defineduser.kickable) return message.channel.send("Vous ne pouvez pas expulser cet utilisateur.")

    let raison = message.content.split(" ").slice(2).join(" ");

    var kickmsg = new Discord.RichEmbed()
        .setColor('ORANGE')
        .setTitle("Vous avez été kick sur le serveur " + message.guild.name)
        .addField("Par : ", message.author.username + "#" + message.author.discriminator)
        .addField("Raison : ", raison ? raison : "Pas de raison précisée.")
        .setTimestamp(new Date)
        .setFooter(client.user.username, client.user.avatarURL)
        .setThumbnail(client.user.avatarURL)
    let sendembd = defineduser.send(kickmsg)

    sendembd.then(() => {
        message.channel.send(defineduser.user.tag + " a été expulsé du serveur.")
        defineduser.kick()

        const modlog = client.modlogchannels.getProp(message.guild.id, `channelid`)
        const logcha = message.guild.channels.find(cha => cha.id === modlog)
        if(!client.modlogchannels.has(message.guild.id)) return;
        else {
            const mdlgmsg = new Discord.RichEmbed()
                .setColor("ORANGE")
                .setAuthor(message.author.tag, message.author.avatarURL)
                .addField("Membre sanctionné :", defineduser.user.tag + ` (${defineduser.user.id})`)
                .addField("Action :", "Kick")
                .addField("Raison :", raison)
                .setTimestamp()
                .setThumbnail(defineduser.user.avatarURL)
                .setFooter(client.user.username, client.user.avatarURL)
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