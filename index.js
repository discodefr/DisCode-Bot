const Discord = require("discord.js")
const client = new Discord.Client({fetchAllMembers: true})
const config = require("./config.json")
const fs = require("fs")
const moment = require("moment");
const Enmap = require("enmap")

client.prefixes = new Enmap({ name: `prefixes` });
client.warns = new Enmap({name: "warns"})
client.modlogchannels = new Enmap({name: "mdlogschnl"})
client.logschannels = new Enmap({name: "logschannels"})
client.suggestchannels = new Enmap({name: "suggestchannels"})

log = (message) => {
  console.log(`[${moment().format("DD/MM/YYYY HH:mm:ss")}] ${message}`);
};


fs.readdir("./events/", (e, files) => {
  if (e) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


		fs.readdir(`./commands`, (e, files) => {
			if (e) console.error(e);
			files.forEach(file => {
				if (file === `module.js`) return
				let props = require(`./commands//${file}`);
				console.log(`   ${props.help.name} chargé.`);
				client.commands.set(props.help.name, props);
				props.conf.aliases.forEach(alias => {
					client.aliases.set(alias, props.help.name);
		});
	});
});

client.on(`error`, console.error);
client.on(`warn`, console.warn);

client.login(config.token)