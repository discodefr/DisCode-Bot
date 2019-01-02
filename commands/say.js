exports.run = (client, message, args) => {
    if(!args[0]) {
        message.channel.send("Merci de préciser ce que vous voulez que le bot dise.")
    }

    else{
        let sayMessage = args.join(" ")

        var r = /[<@&]+(\d{18})[>]+/g
        message.channel.send(sayMessage.replace(r, '<role>'), {disableEveryone:true})
    }
}

exports.help = {
    name: "say",
    description: "Faire parler le bot"
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["s"]
}