const rp = require('request-promise')
const fetch = require('node-fetch')
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

    rp(optionsGeniusSearch).then(
        function(body) {

            if(body.response.hits.length > 0) {

                const song_id = body.response.hits[0].result.id

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
                        .then(sbody => sbody)
                    }
                )
            } else {
                return message.channel.send(`Aucun résultat pour la recherche Genius "${q}" !`)
            }
        }
    )
}

exports.help = {
    name: "lyrics"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}