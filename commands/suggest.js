const Discord = require('discord.js')
const fs = require('fs')
const moment = require("moment")
moment.locale("fr")

exports.run = (client, message, args) => {
    
    var guildprefix = client.prefdb[message.guild.id].prefix;

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    if(!args[0]) {
        if(client.suggestchannels[message.guild.id]) return message.channel.send("Merci d'entrer une suggestion.")

        if(!client.suggestchannels[message.guild.id] && message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Ce serveur n'a pas de salon de channel de suggestions défini. Faites `" + guildprefix + "suggest channel #channel` pour en définir un.")
        if(!client.suggestchannels[message.guild.id]) return message.channel.send("Les suggestions ne sont pas activées sur ce serveur.")
    }

    if(args[0] === "disable") {
        if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send("Vous ne pouvez pas effectuer cette commande.")
        if(!client.suggestchannels[message.guild.id]) return message.channel.send(`${message.author.username}, un channel de suggestions n'est pas défini sur ce serveur, vous n'avez donc pas besoin d'effectuer cette commande.`)
        client.suggestchannels[message.guild.id] = undefined;
        fs.writeFileSync('./databases/suggestchannels.json', JSON.stringify(client.suggestchannels, null, 2), (err) => { 
            console.log(err)
        });
        return message.channel.send("Channel de suggestions désactivé.")
    }

    if(args[0] === "channel" || "enable") {

        if(!args[1] && !client.suggestchannels[message.guild.id]) return message.channel.send(`${message.author.username}, merci de préciser le channel à configurer.`)

        if(!args[1] && client.suggestchannels[message.guild.id]) {
            const chaid = client.suggestchannels[message.guild.id].channelid
            return message.channel.send(`Le salon de suggestions est défini en <#${chaid}> sur ce serveur. Pour le changer, faites \`${guildprefix}suggest channel #channel\`.`)
        }
        
        const margs = args.slice(1).join(' ');
        var chnl;

        if(message.guild.channels.some(channl => channl.id === margs)) {
        chnl = message.guild.channels.get(margs)
        }
        else if(message.mentions.channels.first()) {
        chnl = message.mentions.channels.first()
        }
        else if(message.guild.channels.some(channl => channl.name === margs)) {
        chnl = message.guild.channels.find(channl => channl.name === margs)
        }
        else if(chnl === undefined) {
        return message.channel.send("Le channel demandé n'existe pas. Essayez avec l'identifiant, le nom ou la mention.")
        }   

        message.channel.send(`Salon de suggestions défini en <#${chnl.id}>.`)
        client.suggestchannels[message.guild.id] = {
            channelname: chnl.name,
            channelid: chnl.id
        }

        fs.writeFileSync('./databases/suggestchannels.json', JSON.stringify(client.suggestchannels, null, 2), (err) => { 
            console.log(err)
        });

        return;
    } else {


    if(!client.suggestchannels[message.guild.id]) return message.channel.send("Les suggestions ne sont pas activées sur ce serveur.")
    const chaid = client.suggestchannels[message.guild.id].channelid
    const suggestion = args.join(" ")

    let datef = moment(message.createdAt).format('dddd Do MMMM YYYY, HH:mm:ss');
    let datefr = datef.substring(0,1).toLocaleUpperCase() + datef.substring(1);

    const cha = message.guild.channels.get(chaid)
    let neutreemoteguild = client.guilds.get("440633466128695306")
    let check = neutreemoteguild.emojis.find(emoji => emoji.name === "check")
    let neutre = neutreemoteguild.emojis.find(emoji => emoji.name === "neutre")
    let xmark = neutreemoteguild.emojis.find(emoji => emoji.name === "xmark")
    var suggestembed = new Discord.RichEmbed()
        .setColor("186bbe")
        .setAuthor(`Nouvelle suggestion par ${message.author.tag} !`, message.author.avatarURL)
        .addField("Date de la suggestion :", datefr)
        .addField("Suggestion :", suggestion)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL)
    cha.send(suggestembed).then(suggestembed => {
    message.channel.send("Votre suggestion a bien été envoyée en <#" + chaid + "> ! ")
    suggestembed.react(check).then(() => {
        suggestembed.react(neutre).then(() => {
            suggestembed.react(xmark)
            })
        })
    })
}
}

exports.help = {
    name: "suggest"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["suggestion"]
}