exports.run = (client, message, args) => {
    if(!args[0]) {
        message.channel.send("Merci de préciser ce que vous voulez que le bot dise.")
    }

    else{
        let sayMessage = args.join(" ")
        // var role;
        // var regexid = /(\d{18})/g
       // if(sayMessage.includes("<&" + regexid + ">")) { role = "<&" + }
        message.channel.send(sayMessage, {disableEveryone:true})
    }
}

exports.help = {
    name: "say",
    description: "Faire parler le bot"
}

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ["s"]
}