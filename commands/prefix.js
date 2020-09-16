module.exports = {
  name: 'bt!',
  description: 'Prefix Command',
  execute(msg, args) {
    msg.channel.send('use bt!help for a list of commands');
  },
};
