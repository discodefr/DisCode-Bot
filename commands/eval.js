const { hastebin } = require('eval-overflow');
const Discord = require('discord.js')
const ownersids = ["376812375795302402"]

function clean(text) {
    if (typeof(text) === 'string') return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
}

exports.run = (client, message, args) => {

    if (!ownersids.includes(message.author.id)) return;
    args = args.join(" ");
    if(!args) {
        var wta = new Discord.RichEmbed()
        .setColor("FFA500")
        .setAuthor("DisCode • L'évaluation a échoué", client.user.avatarURL)
        .setDescription("Une erreur est survenue.")
        .addField(":no_entry: Erreur", "``` Arguments manquants ```")
        .setFooter(client.user.username, client.user.avatarURL)
        .setTimestamp()
    return message.channel.send(wta)
    }
    try {
        var evaled = eval(args);
        if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);
        if (evaled.length > 1990) {
            hastebin(`${evaled}`, "js").then(r => {
            message.channel.send(`La sortie fait plus de 2000 caractères. Tiens ${r}.`);
            }).catch(console.error);
        } else {
                var done = new Discord.RichEmbed()
                    .setAuthor("DisCode • Evaluation réussie.", client.user.avatarURL)
                    .setColor("FFA500")
                    .addField(":inbox_tray: Entrée", "```" + args + "```")
                    .addField(":outbox_tray: Sortie", "```" + clean(evaled) + "```")
                    .setFooter(client.user.username, client.user.avatarURL)
                    .setTimestamp()
                message.channel.send(done)
            }
    } catch (err) {
        var errmbd = new Discord.RichEmbed()
            .setColor("FFA500")
            .setAuthor("DisCode • L'évaluation a échoué", client.user.avatarURL)
            .setDescription("Une erreur est survenue.")
            .addField(":no_entry: Erreur", "```" + err + "```")
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp()
        message.channel.send(errmbd)
    }
};

exports.help = {
    name: "eval",
    description: "lol",
    utilis: "lol",
    examples: "lol",
    thumbn: "LOL"
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ev"]
}