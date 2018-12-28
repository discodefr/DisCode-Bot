exports.run = (client, mod, command) => {

    
	return new Promise((resolve, reject) => {
		try {
            
            delete require.cache[require.resolve(`../commands/${command}`)];
            
			let cmd = require(`../commands/${command}`);
            client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
            });
            
            client.commands.set(command, cmd);
            
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
            });
            
			resolve();
		} catch (e) {

			reject(e);
		};
	});
};