const reload = require(`../files/reload`)

exports.run = (client, message, args) => {
    
    if(message.author.id !== '376812375795302402') return message.channel.send('T\'as pas la permission')
    if (!args[0]) return message.channel.send(`Dis moi une commande à reload...`);
    
	let command;
	let mod;

    
	if (client.commands.has(args[0])) {
		command = args[0];
	} else if (client.aliases.has(args[0])) {
        
		command = client.aliases.get(args[0]);
    };
    

    
	if (!command) {
		return message.channel.send(`Cette commande existe pas...`);
	} else {

        
		message.channel.send(`Reload de \`${command}\`...`)
			.then(m => {
                
				reload.run(client, command)
					.then(() => {
                        
                        m.edit(`Commande \`${command}\` reloaded avec succès ! <:noel:464406165791440899>`)
                    })
                    
					.catch(e => {
                        
						m.edit(`Echec du reload de la commande ${command}\n\`\`\`xl\n${e.stack}\`\`\``);
					});
			});
	};
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
}

exports.help = {
    name: 'reload'
}