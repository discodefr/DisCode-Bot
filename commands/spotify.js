const config = require('../config.json')
const Discord = require('discord.js')
const fs = require('fs')
const moment = require('moment')
moment.locale('fr-FR')
const spotlogo = 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d1/Spotify_logo_sans_texte.svg.png/1024px-Spotify_logo_sans_texte.svg.png'

var Spotify = require('node-spotify-api')
var spotify = new Spotify({
    id: config.sid,
    secret: config.ssecret
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

exports.run = (client, message, args) => {
    
    if(args[0] === "track" || args[0] === "son") {

        let qt = args.slice(1).join(' ')
        if(!args[1]) return message.channel.send('Merci de préciser un titre.')

        spotify.search({ type: 'track', query: qt}, function(err, song) {

            if (err) {
                if(!song) {
                    return message.channel.send('Merci de rentrer un titre existant. Vérifiez son ortographe.')
                }

                message.channel.send('Une erreur est survenue, désolé de la gêne occasionée.')
                return console.log('Error occurred: ' + err.stack)

            } else {

                const explicit = song.tracks.items[0].explicit === true ? "Oui" : "Non"
                const sdm = song.tracks.items[0].duration_ms
                var tempTime = moment.duration(sdm);
                var sd = `${tempTime.minutes()}.${tempTime.seconds()}`

                var ft;
                if(song.tracks.items[0].artists.length === 1) {
                    ft = "Non"
                } else if(song.tracks.items[0].artists.length > 1) {
                    ft = `Oui, avec ${song.tracks.items[0].artists[1].name}`
                }

                var artists;
                if(song.tracks.items[0].artists.length === 1) {
                    artists = "Artiste"
                } else if(song.tracks.items[0].artists.length > 1) {
                    artists = "Artistes "
                }

                var artnames;
                if(song.tracks.items[0].artists.length === 1) {

                    artnames = `${song.tracks.items[0].artists[0].name}`

                } else if(song.tracks.items[0].artists.length > 1) {

                    artnames = `${song.tracks.items[0].album.artists[0].name}, ${song.tracks.items[0].artists[1].name}`
                }

                var rdanc = moment(song.tracks.items[0].album.release_date).format('L');
                var dra = rdanc.substring(0,1).toLocaleUpperCase() + rdanc.substring(1);
                var sqe = new Discord.RichEmbed()
                    .setTitle("__" + song.tracks.items[0].name + "__")
                    .setAuthor(artnames, spotlogo)
                    .setColor(client.ecolor)
                    .setURL(song.tracks.items[0].external_urls.spotify)
                    .setThumbnail(song.tracks.items[0].album.images[0].url)
                    .addField(artists, artnames, true)
                    .addField('Explicite ?', explicit, true)
                    .addField('Fait partie de l\'album', song.tracks.items[0].album.name + `, de ${song.tracks.items[0].album.artists[0].name}`, true)
                    .addField('Date de sortie de l\'album', dra, true)
                    .addField('Durée du titre', sd.toString().substr(0, 4) + " minutes", true)
                    .addField('Featuring ?', ft, true)
                    .addField('Titre disponible dans', song.tracks.items[0].available_markets.length + " pays", true)
                    .addField('Popularité du titre\nsur une échelle de 0 à 100', song.tracks.items[0].popularity, true)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL)
                message.channel.send(sqe)
            }
        });
    } else if(args[0] === 'album') {
        let qa = args.slice(1).join(' ')
        if(!args[1]) return message.channel.send("Merci de préciser le titre d'un album.")
        
        spotify.search({type: 'album', query: qa}, function(err, album) {
            if (err) {
                if(!album) {
                    return message.channel.send('Merci de rentrer un titre d\'album existant. Vérifiez son ortographe.')
                }

                message.channel.send('Une erreur est survenue, désolé de la gêne occasionée.')
                return console.log('Error occurred: ' + err.stack)

            } else {
                var artistsa;
                if(album.albums.items[0].artists.length === 1) {
                    artistsa = "Artiste"
                } else if(album.albums.items[0].artists.length > 1) {
                    artistsa = "Artistes"
                }

                var artanames;
                if(album.albums.items[0].artists.length === 1) {

                    artanames = `${album.albums.items[0].artists[0].name}`

                } else if(album.albums.items[0].artists.length > 1) {

                    artanames = `${album.albums.items[0].album.artists[0].name}, ${album.albums.items[0].artists[1].name}`
                }

                var rdanca = moment(album.albums.items[0].release_date).format('L');
                var draa = rdanca.substring(0,1).toLocaleUpperCase() + rdanca.substring(1);
                var sqae = new Discord.RichEmbed()
                    .setTitle("__Album : " + album.albums.items[0].name + "__")
                    .setAuthor(artanames, spotlogo)
                    .setColor(client.ecolor)
                    .setThumbnail(album.albums.items[0].images[0].url)
                    .setURL(album.albums.items[0].external_urls.spotify)
                    .addField(artistsa, artanames, true)
                    .addField('Date de sortie de l\'album', draa, true)
                    .addField('Type de l\'album', album.albums.items[0].album_type.capitalize(), true)
                    .addField('Nombre de titres dans l\'album', album.albums.items[0].total_tracks, true)
                    .addField('Album disponible dans', album.albums.items[0].available_markets.length + " pays", true)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL)
                message.channel.send(sqae)
            }
        })
    } else if(args[0] === "artist" || args[0] === "artiste" || args[0] === "auteur") {
        let qart = args.slice(1).join(' ')
        if(!args[1]) return message.channel.send("Merci de préciser le nom d'un artiste.")

        spotify.search({type: 'artist', query: qart}, function(err, artist) {

            if(args[1] === "Jul") message.channel.send('T\'écoutes ça ? T\'es un beauf')

            var genres = artist.artists.items[0].genres.join(', ').capitalize()
            var sqarte = new Discord.RichEmbed()
                .setTitle('__Artiste : ' + artist.artists.items[0].name + "__")
                .setAuthor(artist.artists.items[0].name, spotlogo)
                .setColor(client.ecolor)
                .setURL(artist.artists.items[0].external_urls.spotify)
                .setThumbnail(artist.artists.items[0].images[0].url)
                .addField('Abonnés Spotify', artist.artists.items[0].followers.total + " abonnés", true)
                .addField('Genres', genres, true)
                .addField('Popularité de l\'artiste\nsur une échelle de 0 à 100', artist.artists.items[0].popularity, true)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
            message.channel.send(sqarte)
        })

    } else {
        let h = exports.help
        let c = exports.conf
        if(c.aliases.length === 1) {
            a = "Alias"
        } else if(c.aliases.length > 1) {
            a = "Aliases"
        }
        const nn = new Discord.RichEmbed()
            .setAuthor(`Commande : ${h.name}`, h.thumbn)
            .setColor(client.ecolor)
            .setThumbnail(h.thumbn)
            .setDescription(h.description)
            .addField(`Utilisation`, h.utilis.replace(reg, guildprefix))
            .addField('Exemples', h.examples.replace(reg, guildprefix))
            .addField(a, c.aliases.join(', ') ? c.aliases.join(', ') : "Pas d'alias pour cette commande.")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send("Une erreur est survenue, veuillez respecter la syntaxe des commandes.").then(() => {
            return message.channel.send(nn)
        })
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    requiredArgs: true,
    aliases: ["spotify-search", "spoti-search"]
}

exports.help = {
    name: "spotify",
    description: '__Description :__ Effectue une recherche [Spotify](https://open.spotify.com/) d\'un album, un titre ou un artiste.',
    utilis: `Pour rechercher un album, faites \n\n\`{guildprefix}spotify album (le nom de l'album)\`\n\nPour rechercher un titre, faites \n\n\`{guildprefix}spotify track (le nom du tire)\` ou\n\`{guildprefix}spotify son (le nom du titre)\`\n\nPour rechercher un artiste, faites \n\n\`{guildprefix}spotify artist (le nom de l'artiste)\` ou\n\`{guildprefix}spotify artiste (le nom de l'artiste)\` ou\n\`{guildprefix}spotify auteur (le nom de l'artiste)\`\n_ _`,
    examples: `\`{guildprefix}spotify track Believer\`\n\`{guildprefix}spotify album Evolve\`\n\`{guildprefix}spotify artist Imagine Dragons\`\n_ _`,
    thumbn: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d1/Spotify_logo_sans_texte.svg.png/1024px-Spotify_logo_sans_texte.svg.png'
}