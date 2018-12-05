exports.run = (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("Vous ne pouvez pas effectuer cette commande.")
    if(!message.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("Je ne peux pas voir les audit logs, donc je ne peux pas définir un channel de logs.")

    if(!args[0]) {

        var guildprefix = client.prefixes.get(message.guild.id);

        if(!client.logschannels.has(message.guild.id)) return message.channel.send("Ce serveur n'a pas de salon de logs défini. Faites `" + guildprefix + "log channel #channel` pour en définir un.")
        const chaid = client.logschannels.get(message.guild.id, "channelid")
        if(client.logschannels.has(message.guild.id)) return message.channel.send(`Le salon de logs est déjà défini en <#${chaid}> sur ce serveur. Pour le changer, faites \`${guildprefix}logs channel #channel\`.`)

    }

    if(args[0] === "disable") {
        if(!client.logschannels.has(message.guild.id)) return message.channel.send(`${message.author.username}, un channel de logs n'est pas défini sur ce serveur, vous n'avez donc pas besoin d'effectuer cette commande.`)
        client.logschannels.delete(message.guild.id)
        return message.channel.send("Channel de logs désactivé.")
    }

    if(args[0] === "channel") {

        if(!args[1]) return message.channel.send(`${message.author.username}, veuillez préciser le channel à configurer.`)

        const margs = message.content.toLowerCase().slice(2)

        var chnl;

        if(message.guild.channels.some(channl => channl.id === margs)) {
        chnl = message.guild.channels.get(margs)
        }
        else if(message.mentions.channels.first()) {
        chnl = message.mentions.channels.first()
        }
        else if(message.guild.channels.some(channl => channl.name === margs.join(" "))) {
        chnl = message.guild.channels.find(channl => channl.name === margs.join(" "))
        }
        else if(chnl === undefined) {
        return message.channel.send("Le channel demandé n'existe pas. Essayez avec l'identifiant, le nom ou la mention.")
        }

        message.channel.send(`Salon de logs défini en <#${chnl.id}>.`)
        client.logschannels.set(message.guild.id, {
            channelname: chnl.name,
            channelid: chnl.id
        })
    }
}

exports.help = {
    name: "logs"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["log"]
}