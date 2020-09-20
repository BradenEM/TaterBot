const Debt = require('../models/Debt');

module.exports = {
  name: `adddebt`,
  description: 'Adding a debt between two users',
  async execute(msg) {

    values = msg.mentions.users.map(user => {
      return [user.id]
    });
    splitmessage = msg.content.split(" ")
    size = msg.mentions.users.size
    amt = splitmessage[3]

    if (size == 2 && splitmessage.length > 3) {
      if (isNaN(amt)) {
        return msg.channel.send('Amount must be a number')
      } else {
        try {
          await Debt.create({
            owing_user: values[0][0],
            collecting_user: values[1][0],
            amount: amt
          })
          msg.channel.send('Debt recorded successfully')
        } catch (e) {
          return msg.channel.send(`ERROR: ${e}`)
        }
      }
    } else if (size != 2) {
      return msg.channel.send('Debt must include 2 tagged users and they must be different')
    } else if (splitmessage.length < 4) {
      return msg.channel.send('An amount must be included and it must be a number')
    } else {
      return msg.channel.send('Tell Babe what you did')
    }
    await Debt.sync();
  }
};