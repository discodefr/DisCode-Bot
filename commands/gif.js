const Discord = require('discord.js')
const rp = require('request-promise')
const config = require('../config.json')

exports.run = (client, message, args) => {

    const q = args.join(' ')
    const query = encodeURIComponent(q)
    const larr = [1, 2, 3, 4, 5, 6, 7]
    const rlimit = larr[Math.round(Math.random() * larr.length)]

    var optionsGifSearch = {
        uri: `https://api.tenor.com/v1/search?tag=${query}&key=${config.tenorToken}&limit=8&locale=fr-FR`,
        json: true
    }

    rp(optionsGifSearch).then(
        function(body) {
            
            const gif = body.results[rlimit]
            const em = new Discord.RichEmbed()
                .setAuthor('Powered by Tenor', 'https://tenor.com/assets/img/tenor-app-icon.png')
                .setImage(gif.media[0].gif.url)
                .setColor(client.ecolor)
                .setTimestamp(new Date)
                .setFooter(client.user.username, client.user.avatarURL)
            message.channel.send(em)
        }
    ).catch(err => {
        return message.channel.send(`Aucun résultat pour la recherche "${q}" sur Tenor.`)
    })
}

exports.help = {
    name: 'gif'
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    requiredArgs: true,
    aliases: ['tenor']
}