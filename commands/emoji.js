var moment = require("moment")
moment.locale('fr');
const Discord = require("discord.js")

exports.run = (client, message, args) => {

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    if (!args[0]) return message.channel.send("Merci de rentrer un emoji.")
    if (message.guild.emojis.some(em => em.name === args[0])) var emo = message.guild.emojis.find(e => e.name === args[0])
    else {
        let idav = args[0].substr(-19).substring(0, 18)
        var emo = message.guild.emojis.find(em => em.id === idav)
    }
    if (emo == undefined) {
        message.channel.send("Merci de rentrer un emoji du serveur.")
    }
    else {
        var emoicn = emo.url;
        var emodate = emo.createdAt;
        var emof = moment(emodate).format('dddd Do MMMM YYYY, HH:mm:ss');
        var emofr = emof.substring(0,1).toLocaleUpperCase() + emof.substring(1);
        var u = emo.animated === true ? "<:done:473803590532595712>" : "<:nope:473803719440597003>";

        let embedaR = new Discord.RichEmbed()
            .setTitle(`Informations sur l'emoji :`)
            .setColor("186bbe")
            .setThumbnail(emoicn)
            .setFooter(client.user.username, client.user.avatarURL)
            .addField(`Id`, `\`${emo.id}\``, true)
            .addField(`Nom`, `\`${emo.name}\``, true)
            .addField(`Animé ?`, u, true)
            .addField(`Créé le :`, `\`${emofr}\``, true)
            .setTimestamp()
        message.channel.send(embedaR)
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["e", "emote"],
};

exports.help = {
    name: "emoji",
    description: "Montrer les infos d'un emoji",
    usage: "=emoji <emoji>"
};