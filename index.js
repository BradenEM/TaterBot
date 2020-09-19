require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const botCommands = require('./commands');
const db = require('./config/database');


bot.commands = new Discord.Collection();

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;
const PREFIX = 'tb!';

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});



// Testing DB
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log(`error: ${err}`));

bot.on('message', msg => {
  if (msg.content.startsWith(PREFIX)) {
    const args = msg.content.slice(PREFIX.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    console.info(`args: ${args}`);
    console.info(`command: ${command}`);

    if (!command) {
      msg.channel.send("Use bt!help for help.")
    }

    if (!bot.commands.has(command)) return;

    try {
      bot.commands.get(command).execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  }



});