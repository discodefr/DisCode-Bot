const rp = require('request-promise')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const config = require('../config.json')

exports.run = (client, message, args) => {

    const q = args.join(" ")
    const query = encodeURIComponent(q)

    var optionsGeniusSearch = {
        uri: 'https://api.genius.com/search?q=' + query,
        auth: {
          'bearer': config.geniusToken
        },
        json: true
    }

    const g = client.guilds.get('482269915517026328')
    const loading = g.emojis.get('542712685909901343')

    message.channel.send(`Obtention des paroles de "${q}" ${loading}`)
    .then(m => {
        rp(optionsGeniusSearch).then(
            function(body) {
    
                if(body.response.hits.length > 0) {
    
                    const thumbnail = body.response.hits[0].result.song_art_image_thumbnail_url
                    const banner = body.response.hits[0].result.header_image_thumbnail_url
                    const song_id = body.response.hits[0].result.id
                    const title = body.response.hits[0].result.full_title
    
                    var optionsGeniusGetSong = {
                        uri: 'https://api.genius.com/songs/' + song_id,
                        auth: {
                            'bearer': config.geniusToken
                        },
                        json: true
                    }
    
                    rp(optionsGeniusGetSong).then(
                        function(song) {
                            fetch(song.response.song.url)
                            .then(res => res.text())
                            .then(rbody => {
                                $ = cheerio.load(rbody)
                                var lyrics = $('.lyrics').text()
                                
                                var para = lyrics.split('\n\n')

                                m.delete()

                                for(i=0; i < para.length - 1; i++) {
                                    message.channel.send(`${para[i]}\n_ _`)
                                }
                            })
                        }
                    )
                } else {
                    return message.channel.send(`Aucun résultat pour la recherche Genius "${q}" !`)
                }
            }
        )
    })
}

exports.help = {
    name: "lyrics",
    description: "Renvoie les paroles d'une chanson précisée.",
    utilis: "Pour obtenir les paroles d'une chanson, faites\n\n`{guildprefix}lyrics (chanson)`",
    examples: "`{guildprefix}lyrics Wake me up`",
    thumbn: 'https://static1.squarespace.com/static/50dd8021e4b0c2f49763b75d/t/598cd3bddb29d6de931000c0/1502401538369/LyricsView.png'
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    requiredArgs: true,
    aliases: ["paroles"]
}