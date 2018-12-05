const Discord = require('discord.js')

exports.run = (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send("Vous n'avez pas la permission de définir un channel logs de modération.")

    if(!args[0]) {

        var guildprefix = client.prefixes.get(message.guild.id);

        if(!client.modlogchannels.has(message.guild.id)) return message.channel.send("Ce serveur n'a pas de salon de modlogs défini. Faites `" + guildprefix + "log channel #channel` pour en définir un.")
        const chaid = client.modlogchannels.get(message.guild.id, "channelid")
        if(client.modlogchannels.has(message.guild.id)) return message.channel.send(`Le salon de modlogs est déjà défini en <#${chaid}> sur ce serveur. Pour le changer, faites \`${guildprefix}logs channel #channel\`.`)

    }
    if(args[0] === "disable") {
        if(!client.modlogchannels.has(message.guild.id)) return message.channel.send(`${message.author.username}, un channel de logs de modération n'est pas défini sur ce serveur, vous n'avez donc pas besoin d'effectuer cette commande.`)
        client.modlogchannels.delete(message.guild.id)
        return message.channel.send("Channel de logs de modération désactivé.")
    }

    if((args[0] === "set") || (args[0] === "enable")) {
        const margs = args.slice(1).join(` `);

        if(!args[1]) return message.channel.send(`${message.author.username}, merci de préciser le channel à configurer.`)
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

        message.channel.send(`Salon de sanctions défini en <#${chnl.id}>.`)
        client.modlogchannels.set(message.guild.id, {
            channelname: chnl.name,
            channelid: chnl.id
        })
    }
}

exports.help = {
    name: "modlog"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["mod-log"]
}