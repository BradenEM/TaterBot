module.exports = {
  name: 'tb!',
  description: 'Prefix Command',
  execute(msg, args) {
    msg.channel.send('use tb!help for a list of commands');
  },
};