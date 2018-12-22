const fs = require("fs")
const Discord = require("discord.js")

exports.run = (client, message, args) => {

    const reponses = JSON.parse(fs.readFileSync('./files/8ballreponses.json', "utf8"))
    const done = args.join(" ")
    var ans = reponses[Math.round(Math.random() * reponses.length)]

    if(!done) {
        let ballembed = new Discord.RichEmbed()
            .setColor("#7EBCAD")
            .setTitle("Commande : 8ball")
            .setDescription("Rappel : les caractères tels que [], {} ou <> ne doivent pas être utilisés lors de l\'exécution de votre commande. ")
            .addField("Description de la commande", "Le bot répond par une question que vous avez posé juste avant. :8ball:")
            .addField("Utilisation", "`-8ball {question}`")
            .addField("Alias", "`-8b`")
            .setTimestamp(new Date)
            .setThumbnail(client.user.avatarURL)
            .setFooter(client.user.username, client.user.avatarURL)
        message.channel.send(ballembed)
    }
    else if((!message.content.endsWith("?") || (!message.content.endsWith(" ?")))) {
            message.channel.send('Merci de poser une vraie question se terminant par "?"')
        }
        else {

    message.channel.send(`:8ball: **${message.author.username}**, ` + ans)
    }

}
exports.help = {
    name: "8ball",
    description: 'Envoie une réponse aléatoire à votre question.\n*__Note :__ Le texte entre parenthèses est obligatoire, et le texte entre crochets est optionnel.*',
    utilis: 'Veuilez bien respecter l\'espace entre la question et le point d\'interrogation. Veuillez poser des questions fermées de préférence.\n\n`{guildprefix}8ball (question)`',
    examples: '`{guildprefix}8ball Est-ce que le JS est mieux que le Python ?`',
    thumbn: 'http://www.pages.drexel.edu/~cjb356/cs164/lab8/8ball.png'

}

exports.conf = {
    enabled: true,
    dm: true,
    aliases: ["8b"]
}