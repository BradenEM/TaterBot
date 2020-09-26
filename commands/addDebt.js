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
    amt = Math.floor(splitmessage[3])

    console.log(values[0][0])
    if (size == 2 && splitmessage.length > 3) {
      if (isNaN(amt)) {
        console.log(amt)
        return msg.channel.send('Amount must be a number or you have additional spaces in your command')
      } else {
        try {
          await Debt.create({
            owing_user: parseInt(values[0][0]),
            collecting_user: parseInt(values[1][0]),
            amount: parseInt(amt)
          })
          await Debt.sync();
          return msg.channel.send('Debt recorded successfully')
        } catch (e) {
          if (e == "SequelizeForeignKeyConstraintError: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed") {
            return msg.channel.send('Make sure both users have been added via the "add" command')
          } else {
            return msg.channel.send(`ERROR: ${e}`)
          }
        }
      }
    } else if (size != 2) {
      return msg.channel.send('Debt must include 2 tagged users and they must be different')
    } else if (splitmessage.length < 4) {
      return msg.channel.send('An amount must be included and it must be a number')
    } else {
      return msg.channel.send('Tell Babe what you did')
    }
  }
};