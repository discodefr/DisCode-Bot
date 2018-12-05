exports.run = (client, message, args) => {
if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`Il vous manque la permission \`MANAGE_MESSAGES\` pour utiliser cette commande.`);

    let nums = args.join(` `);
    if (!args[0]) { 
        message.channel.send(`Veuillez indiquer le nombre de messages à supprimer`);
    }

    else {
        let numa = parseInt(nums) + 1;
        if (isNaN(numa)) {
            message.channel.send(`Merci de rentrer un chiffre...`);
        }
        else { 
            if (numa === 1) { 
                message.channel.send(`Je peux pas supprimer zéro message...`);
            }
            else { 
                message.channel.bulkDelete(numa);
                if (numa === 2) { 
                    message.channel.send(`${numa - 1} message supprimé !`).then(sentMessage => {
                        setTimeout(() => {
                            sentMessage.delete();
                        }, 3000)
                    });
                }
                else {
                    message.channel.send(`${numa - 1} messages supprimés !`).then(sentMessage => {
                        setTimeout(() => {
                            sentMessage.delete();
                        }, 3000)
                    });
                };
            };
        };
    };
}

exports.help = {
    name:"purge"
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["clear"]
}