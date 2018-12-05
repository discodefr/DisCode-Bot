exports.run = (client, message) => {
    message.channel.send('Pong ! `' + ` ${client.ping} ` + '` ms' + ' :ping_pong:')
}

exports.help = {
    name: "ping"
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["p"]
}