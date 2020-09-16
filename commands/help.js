module.exports = {
  name: 'help',
  description: 'Help',
  execute(msg, args) {
    msg.channel.send("This is a line of text \nThis is a line of text");
    msg.channel.send('This is a line of text');
    msg.channel.send('This is a line of text');
  },
};
