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

    message.channel.send(`${message.author.username}, voici l'id de ${usr.user.tag} : \`${usr.user.id}\`.`)
    
}
exports.help = {
    name: "id"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["identifier"]
}