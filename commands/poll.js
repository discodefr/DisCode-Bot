const emojif = require('../files/emojiCharacters')
const Discord = require('discord.js')
const idarray = ['482269915517026328', '467258216485617664']
const aa = ['1', '12', '123', '1234', '12345', '123456', '1234567', '12345678', '123456789', '1234567890', 'yn']

exports.run = (client, message, args) => {

    if(!idarray.includes(message.guild.id)) return;
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'avez pas la permission de créer des sondages !")

    var t = args[0];
	var q = args.slice(1).join(` `);
    var rt;
    const rg = client.guilds.get('482269915517026328')
    const gr = rg.roles.get('498055718457573378')
    const pollch = rg.channels.get('498055409043636224')

    var num = [emojif[1], emojif[2], emojif[3], emojif[4], emojif[5], emojif[6], emojif[7], emojif[8], emojif[9], emojif[10]];

    //sondage yes no
    if (t === `yn`) rt = [`473803590532595712`, `473803719440597003`];
    //sondage chiffres
    else if (t.length < 11 && t.length > 1) rt = num.slice(0, t.length);
    else return message.channel.send('Mets moins de 10 réactions...')

    if(!aa.includes(args[0])) return message.channel.send('yn ou chiffres ?')

    var embed = new Discord.RichEmbed()
        .setAuthor(`Nouveau sondage !`, 'https://i.vimeocdn.com/portrait/18778258_300x300')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/bar-chart_1f4ca.png')
		.setDescription(q)
		.setColor(`#FCB00A`)
		.setFooter(client.user.username, client.user.avatarURL)
        .setTimestamp();
    
    gr.setMentionable(true).then(() => {
        pollch.send('<@&498055718457573378>').then(() => {
            gr.setMentionable(false)
        })
    })

    pollch.send(embed).then(m => {

		function delay() {
			return new Promise(resolve => setTimeout(resolve, 500));
        };
        
		async function delayedReact(emote) {

            await delay();
            
			m.react(emote);
        };
        
		async function processArray(rt) {

			for (const emote of rt) {

				await delayedReact(emote);
			};
		};
		processArray(rt)
    });

}

exports.help = {
    name: 'poll',
    description: 'Crée un sondage. SPÉCIAL ADMIN !',
    utilis: 'Pour créer un sondage OUI ou NON, faites :\n\n`{guildprefix}poll yn (question)`\n\nPour créer un sondage avec PLUSIEURS choix, faites :\n\n`{guildprefix}poll 1234567890 (question)`\n\n:warning: POUR LES SONDAGES À PLUSIEURS CHOIX, METTEZ AUTANT DE NOMBRES QUE VOUS VOULEZ DE CHOIX (Exemple : 123 piur avoir des réactions allant de 1 à 3, 1234567 pour des réactions allant jusqu\'à 7, mais attention, le 10 est le nombre maximal et **il s\'écrit "0" !** Par exemple pour faire jusqu\'à 10, faites 1234567890 !',
    examples: '`{guildprefix}poll yn Écoutez-vous votre musique sur Spotify ?`\n`{guildprefix}poll 123 Votre logiciel de musique préféré ?`\n:one: Spotify\n:two: Deezer\n:three: Apple Music',
    thumbn: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/65/c558c0f50211e5a52493c7e6aee302/baysian_statistics.v2a.png?auto=format%2Ccompress&dpr=2.625'
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    requiredArgs: true,
    aliases: ['sondage']
}