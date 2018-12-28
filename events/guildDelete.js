const fs = require("fs")

exports.run = (client, guild) => {
    if(client.prefdb[guild.id]) {
        client.prefdb[guild.id] = undefined
    } else return;
    fs.writeFileSync('./databases/prefixes.json', JSON.stringify(client.prefdb, null, 2), (err) => {
        console.log(err)
    })
}