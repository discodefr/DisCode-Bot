const weather = require('weather-js');
const Discord = require('discord.js');
const moment = require('moment');

exports.run = (client, message, args) => {
    
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    if(!args[0]) return message.channel.send("Merci de préciser une ville, ou un village.")

    weather.find({search: args.join(' '), degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);

        if(result.length === 0) {
            message.channel.send("Localisation non valable. Merci de fournir plus de détails (Numéro ou nom de département...).")
            return;
        }
        
        var current = result[0].current
        var location = result[0].location
        var forecast = result[0].forecast

        var datef = moment(message.createdAt).format('dddd Do MMMM YYYY');
        var datefr = datef.substring(0,1).toLocaleUpperCase() + datef.substring(1);

        if(!location.alert) {
            location.alert = "Pas d'alerte."
        }

        let weatherembd = new Discord.RichEmbed()
            .setColor('186bbe')
            .setAuthor("Météo à " + location.name.capitalize(), 'https://www.sltrib.com/resources/assets/img/forecast_icons/weathericons_partly-cloudy-day.png')
            .addField('Jour', current.day.capitalize(), true)
            .addField('Date', datefr, true)
            .addField("Température", current.temperature + "°C", true)
            .addField('Ressenti', current.feelslike + "°C", true)
            .addField("Vitesse du vent", current.windspeed, true)
            .addField("Sens du vent", current.winddisplay, true)
            .addField('Temps actuel', current.skytext, true)
            .addField('Humidité', current.humidity + "%", true)
            .addField('Alerte', location.alert, true)
            .addField('Type de degrés', "°" + location.degreetype, true)
            .addField('Heure d\'observation', current.observationtime, true)
            .addField('Point d\'observation', current.observationpoint, true)
            .setThumbnail(current.imageUrl)
            .setTimestamp(new Date)
            .setFooter(client.user.username, client.user.avatarURL)
        message.channel.send(weatherembd)
    });
}

exports.help = {
    name: "weather",
    description: 'Donne la météo à un point précis.\n*__Note :__ Le texte entre parenthèses est obligatoire, et le texte entre crochets est optionnel.*',
    utilis: `Pour chercher la météo, faites\n\n\`{guildprefix}weather (endroit dans le monde)\``,
    examples: `\`{guildprefix}weather Paris\`\n\`{guildprefix}weather Tokyo, Japan\``,
    thumbn: 'https://lh3.googleusercontent.com/ElyVRhaEtXxCJDG7k0wtgvX9ahYRt_Q3skYBE6K5xyFnkqPLw6xZkvRafrUj4cztAEs'
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["meteo", "météo"]
}