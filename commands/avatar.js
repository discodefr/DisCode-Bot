const Discord = require('discord.js')

exports.run = (client, message, args) => {

    var usr;

    if(!args[0]) {
        usr = message.member
    }
    else if(message.guild.members.some(usr => usr.id === args[0])) {
        usr = message.guild.members.get(args[0])
    }
    else if(message.mentions.members.first()) {
        usr = message.mentions.members.first()
    }
    else if(message.guild.members.some(usr => usr.user.username === args.join(" "))) {
        usr = message.guild.members.find(usr => usr.user.username === args.join(" "))
    }
    else if(usr === undefined) {
        return message.channel.send("L'utilisateur demandé n'existe pas. Essayez avec l'identifiant, le nom ou la mention.")
            
    }

    var av = new Discord.RichEmbed()
        .setAuthor("Avatar de " + usr.user.username, usr.user.avatarURL)
        .setColor("186bbe")
        .setImage(usr.user.avatarURL)
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL)
    message.channel.send(av)
}

exports.help = {
    name: "avatar"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["pfp", "pp"]
}