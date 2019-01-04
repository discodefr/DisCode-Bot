const Discord = require('discord.js')
const Fortnite = require('fortnite')
const config = require('../config.json')
const platforms = ["xbl", "pc", "psn"]

const fortnite = new Fortnite(config.trnkey)

exports.run = (client, message, args) =>  {

    const pl = args[0]
    const user = args.slice(1).join(" ")
    if(!platforms.includes(pl)) return message.channel.send("La plateforme que vous avez précisé n'est pas valide.\nVeuillez préciser une plateforme valide parmi les suivantes :\n`psn` pous PlayStation,\n`xbl` pour Xbox,\n`pc` pour ordinateur")

    fortnite.user(user, pl).then((result, err) => {
        var av;

        if(result.platform === "PlayStation 4") {
            av = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1200px-PlayStation_logo.svg.png"
        } else if(result.platform === "Computer") {
            av = "https://cdn4.iconfinder.com/data/icons/computers-it/48/computer-02-512.png"
        } else if(result.platform === "Xbox") {
            av = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1024px-Xbox_one_logo.svg.png"
        } else {
            av = "https://images-ext-2.discordapp.net/external/4LqzsAnKGbPbbnGAIXTyZUdPQA42W_iBFhvgeghcvxw/https/cdn.discordapp.com/emojis/520679986261131267.png"
        }

        const solo = result.stats.solo
        const duo = result.stats.duo
        const lifetime = result.stats.lifetime
        const fstats = new Discord.RichEmbed()
            .setAuthor("Fortnite Stats", av, result.url)
            .setThumbnail("https://yt3.ggpht.com/-1osTNRChd0k/AAAAAAAAAAI/AAAAAAAAAAA/XGxeX-iWpW0/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg")
            .setColor('#49bfed')
            .addField("Pseudo", result.username, true)
            .addField("Plateforme", result.platform, true)
            .addField("Id de l'utilisateur", result.id)
            .addField("_ _", "_ _")
            .addField("__STATS EN SOLO__", "_ _")
            .addField("Solos joués", solo.matches, true)
            .addField("Ratio kills/morts", solo.kd, true)
            .addField("Score total en solo", solo.score, true)
            .addField("Moyenne de score par solo", solo.score_per_match, true)
            .addField("Kills totaux en solo", solo.kills, true)
            .addField("Moyenne de kills par solo", solo.kills_per_match, true)
            .addField("Nombre de tops 3 en solo", solo.top_3, true)
            .addField('nombre de tops 5 en solo', solo.top_5, true)
            .addField('_ _', '_ _')
            .addField("__STATS EN DUO__", "_ _")
            .addField("Duos joués", duo.matches, true)
            .addField("Ratio kills/morts", duo.kd, true)
            .addField("Score total en duo", duo.score, true)
            .addField("Moyenne de score par duo", duo.score_per_match, true)
            .addField('Kills totaux en duo', duo.kills, true)
            .addField("Moyenne de kills par duo", duo.kills_per_match, true)
            .addField("Nombre de tops 3 en duo", duo.top_3, true)
            .addField("Nombre de tops 5 en duo", duo.top_5, true)
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTimestamp(new Date)
        message.channel.send(fstats)
    }).catch(err => {
        const rg = client.guilds.get('467258216485617664')
        const rc= rg.channels.get('530375912118681610')
        message.channel.send("L'utilisateur que vous avez demandé n'existe pas sur cette plateforme.")
        rc.send(`Erreur sur la commande fortnite :\n\n\`\`\`${err.toString()}\`\`\``)
    })
}

exports.help = {
    name: "fortnite",
    description: "Donne les statistiques d'un utilisateur Fortnite.",
    utilis: "Pour obtenir des informations sur un utilisateur Fortnite, faites\n\n`{guildprefix}fortnite (plateforme) (pseudo de l'utilisateur)`\n\nLes plateformes disponibles sont :\n`psn` : PlayStation,\n`pc` : PC,\n`xbl` : Xbox",
    examples: "`{guildprefix}fortnite pc GotagaTV`\n`{guildprefix}fortnite xbl Twitch_Elogyy`\n`{guildprefix}fortnite psn TDK_Lamo`",
    thumbn: "https://images-ext-2.discordapp.net/external/4LqzsAnKGbPbbnGAIXTyZUdPQA42W_iBFhvgeghcvxw/https/cdn.discordapp.com/emojis/520679986261131267.png"
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    requiredArgs: true,
    aliases: ["ftn"]
}