module.exports = {
  name: 'bing',
  description: 'Ping!',
  execute(msg, args) {
    msg.reply('poing');
    msg.channel.send('pong');
  },
};
