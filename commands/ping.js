exports.run = (client, message) => {

    const ping = client.ping.toString().substring(0, 6)

    message.channel.send('Pinging...').then(m => {
        m.edit('Pong ! :ping_pong:\n\nLe ping de l\'API Discord est de : `' + ping + `\` ms\nLe ping du bot est de \`${m.createdTimestamp - message.createdTimestamp}\` ms`)
    });
}

exports.help = {
    name: "ping"
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    requiredArgs: false,
    aliases: ["p"]
}