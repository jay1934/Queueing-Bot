const { Client, Collection } = require('discord.js');

const client = new Client();
client.active = new Collection();
client.queue = [];

require('fs')
  .readdirSync('./events')
  .forEach((file) =>
    client.on(file.split('.')[0], require(`./events/${file}`))
  );

client.login(require('./config.json').token);
