exports.run = (client, guild) => {
    if(!client.prefixes.has(guild.id)) return;
    if(!client.modlogchannels.has(guild.id)) return;
    if(!client.logschannels.has(guild.id)) return;
    if(!client.suggestchannels.has(guild.id)) return;

    client.prefixes.delete(guild.id);
    client.modlogchannels.delete(guild.id);
    client.logschannels.delete(guild.id);
    client.suggestchannels.delete(guild.id)
}