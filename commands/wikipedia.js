const Discord = require('discord.js')
const wiki = require('wikijs').default
const plangs = ["fr", "en", "it", "es"]

exports.run = (client, message, args) => {

    var lang;
    var query;
    if(args[0] && plangs.includes(args[0])) {
        query = args.slice(1).join(' ')
        lang = args[0]
    } else if(!plangs.includes(args[0])) {
        query = args.join(" ")
        lang = "fr"
    }

    let wikiUrl = `https://${lang}.wikipedia.org/w/api.php`

    wiki({apiUrl: wikiUrl})
    .search(query)
    .then((data, err) => {
        if(!data) return message.channel.send(`Pas de résultats pour la recherche Wikipedia "${query}".`)
        if(err) return message.channel.send(`Pas de résultats pour la recherche Wikipedia "${query}".`)
        wiki({apiUrl: wikiUrl})
        .page(data.results[0])
        .then(page => {
            page.summary().then(sum => {
                 if(sum) {
                    const s = sum.split("\n").join("\n\n").substring(0, 1980)
                    const sq = new Discord.RichEmbed()
                        .setColor(client.ecolor)
                        .setAuthor('Wikipedia', exports.help.thumbn)
                        .setTitle(page.raw.title)
                        .setDescription(s + `… [[Lire plus]](${page.raw.fullurl})`)
                        .setFooter(client.user.username, client.user.displayAvatarURL)
                        .setTimestamp()
                    message.channel.send(sq)
                }
            })
        })
    }).catch(e => {
        return message.channel.send(`Pas de résultats pour la recherche Wikipedia "${query}".`)
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    requiredArgs: true,
    aliases: ['wiki']
}

exports.help = {
    name: "wikipedia",
    description: "Effectue une recherche Wikipedia.",
    utilis: "Pour effectuer une recherche Wikipedia, faites :\n\n`{guildprefix}wikipedia [langue] (recherche)`\n\n*Note : la langue par défaut est le français.\nLes langues disponibles sont :*\n```asciidoc\n= es = : Espagnol,\n= it = : Italien,\n= en = : Anglais```",
    examples: "`{guildprefix}wikipedia Mickael Jackson`\n`{guildprefix}wikipedia es Buenos Aires`\n`{guildprefix}wikipedia en London`",
    thumbn: 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png'
}