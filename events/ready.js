const moment = require('moment')

exports.run = (client) => {
      client.user.setActivity(`${client.guilds.size} serveurs • ${client.users.size} utilisateurs`, { type: 'Watching' });
      console.log(client.guilds.size + " serveurs, " + client.users.size + " utilisateurs.");
}