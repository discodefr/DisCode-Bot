exports.run = (client, message) => {

    const ping = client.ping
    message.channel.send('Pong ! `' + ` ${ping} ` + '` ms' + ' :ping_pong:')
}

exports.help = {
    name: "ping"
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["p"]
}