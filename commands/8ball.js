const fs = require("fs")
const Discord = require("discord.js")

exports.run = (client, message, args) => {

    const reponses = JSON.parse(fs.readFileSync('./files/8ballreponses.json', "utf8"))
    var ans = reponses[Math.round(Math.random() * reponses.length)]
    
    if((!message.content.endsWith("?") || (!message.content.endsWith(" ?")))) {
            message.channel.send('Merci de poser une vraie question se terminant par "?"')
        } else {

    message.channel.send(`:8ball: **${message.author.username}**, ` + ans)
    }

}
exports.help = {
    name: "8ball",
    description: 'Envoie une réponse aléatoire à votre question.',
    utilis: 'Veuilez bien respecter l\'espace entre la question et le point d\'interrogation. Veuillez poser des questions fermées de préférence.\n\n`{guildprefix}8ball (question)`',
    examples: '`{guildprefix}8ball Est-ce que le JS est mieux que le Python ?`',
    thumbn: 'http://www.pages.drexel.edu/~cjb356/cs164/lab8/8ball.png'

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    requiredArgs: true,
    aliases: ["8b"]
}