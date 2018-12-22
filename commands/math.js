const math = require('mathjs');

exports.run = (client, message, args) => {
  if(!args[0]) {
    return message.channel.send("Merci de donner un calcul.\n*Note : la racine carré s'écrit sqrt(nombre) et les exposants se notent ^(nombre), par exemple : 6^2.*")
  }
    let calc;
    var args = args.join(" ");
    try {
      calc = math.eval(args);
    } catch (err) {
      calc = err
    }
  message.channel.send(`**Calcul :**\n\`\`\`\n${args}\`\`\`\n**Résultat :**\n\`\`\`\n${calc}\`\`\``)
  }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [`m`],
};
  
exports.help = {
    name: `math`,
    description: `Faisons des maths.`,
    usage: `=maths <votre calcul`,
};