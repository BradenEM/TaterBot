const Transaction = require('../models/Transaction')

module.exports = {
  name: `transaction`,
  description: 'perforrming a transaction between two users',
  async execute(msg) {

    values = msg.mentions.users.map(user => {
      return [user.id]
    });
    splitmessage = msg.content.split(" ")
    size = msg.mentions.users.size
    amt = Math.floor(splitmessage[3])

    if (size == 2 && splitmessage.length > 3) {
      if (isNaN(amt)) {
        return msg.channel.send('Amount must be a number or you have additional spaces in your command')
      } else {
        try {
          await Transaction.create({
            paying_user: parseInt(values[0][0]),
            receiving_user: parseInt(values[1][0]),
            amount: parseInt(amt)
          })
          msg.channel.send('Transaction recorded successfully')
        } catch (e) {
          return msg.channel.send(`ERROR: ${e}`)
        }
      }
    } else if (size != 2) {
      return msg.channel.send('Transaction must include 2 tagged users and they must be different')
    } else if (splitmessage.length < 4) {
      return msg.channel.send('An amount must be included and it must be a number')
    } else {
      return msg.channel.send('Tell Babe what you did')
    }
    await Transaction.sync();
  }
};