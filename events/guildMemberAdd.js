const Discord = require('discord.js')

exports.run = (client, member) => {

    /*if(!client.logschannels.has(member.guild.id)) return;
    const log = client.logschannels.get(member.guild.id, `channelid`)
    const logs = member.guild.channels.get(log)

    let joinlogsembed = new Discord.RichEmbed()
        .setAuthor("Arrivée", member.user.displayAvatarURL)
        .setColor("186bbe")
        .setThumbnail(member.user.displaydisplayAvatarURL)
        .addField(`<@${member.user.id}>`, `(${member.user.tag})`)
        .setTimestamp()
        .setFooter(`ID : ${member.user.id}`)
    logs.send(joinlogsembed)*/
}