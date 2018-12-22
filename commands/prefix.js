const fs = require('fs')
const config = require("../config.json")

exports.run = (client, message, args) => {
  
	client.prefdb = JSON.parse(fs.readFileSync('./databases/prefixes.json', "utf8"))

	if (!client.prefdb[message.guild.id]) {
		client.prefdb[message.guild.id] = {
			prefix: config.prefix
		}
	}

	let curpref = client.prefdb[message.guild.id].prefix;
	if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`Vous avez besoin de la permssion \`ADMINISTRATOR\` pour changer le préfix !`)
	if (!args[0]) return message.channel.send(`Mon préfix sur ce serveur est \`${curpref}\` !\nPour le modifier, effectuez \`${curpref}prefix {votre prefix}\``);
	let newprefix = args.join(" ");
	
	client.prefdb[message.guild.id] = {
		prefix: newprefix
	}

	fs.writeFileSync('./databases/prefixes.json', JSON.stringify(client.prefdb, null, 2), (err) => { 
		console.log(err)
	});
	message.channel.send(`Le prefix a été changé sur : \`${newprefix}\` !`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`pref`, `newprefix`, `setprefix`],
};

exports.help = {
	name: `prefix`
};