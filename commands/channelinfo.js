const Discord = require('discord.js')
const moment = require('moment')
moment.locale('fr')

exports.run = (client, message, args) => {

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var chnl;

    if(!args[0]) {
        chnl = message.channel
    }
    else if(message.guild.channels.some(channl => channl.id === args[0])) {
        chnl = message.guild.channels.get(args[0])
    }
    else if(message.mentions.channels.first()) {
        chnl = message.mentions.channels.first()
    }
    else if(message.guild.channels.some(channl => channl.name === args.join(" "))) {
        chnl = message.guild.channels.find(channl => channl.name === args.join(" "))
    }
    else if(chnl === undefined) {
        return message.channel.send("Le channel demandé n'existe pas. Essayez avec l'identifiant, le nom ou la mention.")
    }
    
        const chnltype = chnl.type === "text" ? "Textuel" : "Vocal"
        let chacreadate = chnl.createdAt
        let chacreadatef = moment(chacreadate).format("DD/MM/YY HH:mm:ss");
        let chacreadatefr = chacreadatef.substring(0,1).toLocaleUpperCase() + chacreadatef.substring(1);
        let channelembd = new Discord.RichEmbed()
            .setAuthor('Informations sur le channel', message.guild.iconURL)
            .setColor('186bbe')
            .addField('Nom du channel', "#" + chnl.name, true)
            .addField('ID du channel', chnl.id, true)
            .addField('Type du channel', chnltype, true)
            .addField('Position du channel', chnl.calculatedPosition, true)
            .setTimestamp(new Date)
            .addField('Création du channel', chacreadatefr, true)
            .addField('Topic du channel', chnl.topic ? chnl.topic : "Aucun", true)
            .setFooter(client.user.username, client.user.avatarURL)
        message.channel.send(channelembd)
        
}

exports.help = {
    name: "channelinfo",
    description: "Donne des infos sur le channel précisé.\n*__Note :__ Le texte entre parenthèses est obligatoire, et le texte entre crochets est optionnel.*",
    utilis: "Pour utiliser cette commande, faites :\n\n`{guildprefix}channelinfo (#channel)`",
    examples: "{guildprefix}channelinfo #règlement",
    thumbn: 'https://p0.storage.canalblog.com/06/21/1301665/99112564_o.png'
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ci"]
}