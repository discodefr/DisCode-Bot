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
    name: "avatar",
    description: 'Renvoie l\'avatar de l\'utilisateur précisé.\n*__Note :__ Le texte entre parenthèses est obligatoire, et le texte entre crochets est optionnel.*',
    utilis: 'Pour renvoyer l\'avatar d\'un utilisateur, faites\n\n`{guildprefix}avatar (@user || user#1234 || id de l\'user)`',
    examples: '`{guildprefix}avatar (Paulé#8182 || @Paulé || 376812375795302402)`',
    thumbn: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png'
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["pfp", "pp"]
}