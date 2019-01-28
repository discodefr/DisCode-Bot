exports.run = (client, message) => {

    const ping = client.ping.toString().substring(0, 6)

    message.channel.send('Pinging...').then(m => {
        m.edit('Pong ! `' + ` ${ping} ` + '` ms' + ' :ping_pong:')
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