const rp = require('request-promise')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const Discord = require('discord.js')
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

    message.channel.send(`Obtention des paroles de "${q}"...`)
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
                                for(i=0; i< para.length - 1; i++) {
                                    message.channel.send(para[i] + "\n\n")
                                }
                                const e = new Discord.RichEmbed()
                                    .setAuthor(title, thumbnail)
                                    .setThumbnail(banner)
                                    .setDescription(lyrics.substring(0, 2030))
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
    name: "lyrics"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}