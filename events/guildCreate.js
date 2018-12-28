const fs = require('fs')

exports.run = (client, guild) => {
    client.prefdb[guild.id] = {
		prefix: "&"
	}
	fs.writeFileSync('./databases/prefixes.json', JSON.stringify(client.prefdb, null, 2), (err) => { 
		console.log(err)
	});
}