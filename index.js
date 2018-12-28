const Discord = require("discord.js")
const client = new Discord.Client({fetchAllMembers: true})
const config = require("./config.json")
const fs = require("fs")
const moment = require("moment");
/*const Enmap = require("enmap")

client.prefixes = new Enmap({ name: `prefixes` });
client.warns = new Enmap({name: "warns"})
client.modlogchannels = new Enmap({name: "mdlogschnl"})
client.logschannels = new Enmap({name: "logschannels"})
client.suggestchannels = new Enmap({name: "suggestchannels"})*/

client.prefdb = JSON.parse(fs.readFileSync('./databases/prefixes.json', "utf8"))
client.suggestchannels = JSON.parse(fs.readFileSync('./databases/suggestchannels.json', "utf8"))
client.modlogchannels = JSON.parse(fs.readFileSync('./databases/mlchannels.json', 'utf8'))

client.ecolor = "186bbe"


fs.readdir("./events/", (e, files) => {
  if (e) return console.error(e);
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
		console.log(`[${moment().format("DD/MM/YYYY HH:mm:ss")}]   ${props.help.name} chargé.`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

client.on(`error`, console.error);
client.on(`warn`, console.warn);

client.login(config.token)