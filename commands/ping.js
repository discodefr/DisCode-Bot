exports.run = (client, message) => {

    const ping = client.ping.toString().split(".")[0]
    var aftercomma;
    if(!client.ping.toString().includes(".")) {
        return;
    } else if(client.ping.toString().includes(".")) {
        aftercomma = "." + client.ping.toString().split(".")[1].slice(0, 3)
    }

    const rping = ping + aftercomma

    message.channel.send('Pinging...').then(m => {
        m.edit('Pong ! `' + ` ${rping} ` + '` ms' + ' :ping_pong:')
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