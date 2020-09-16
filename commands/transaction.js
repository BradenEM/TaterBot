const User = require('../models/User');
const Transaction = require('../models/Transaction')
const db = require('../config/database');

module.exports = {
  name: `transaction`,
  description: 'perforrming a transaction between two users',
  async execute(msg) {
    if (msg.mentions.users.size != 2) {
      console.log(msg.mentions.users.id);
      return msg.channel.send('You need to tag 2 users to complete a transaction')
    } else {
        try {
          values = msg.mentions.users.map(user => {
              return [user.id, user.username]
          });
          console.log(values[1][0])
          await Transaction.create({
            paying_user: values[0][0],
            receiving_user: values[1][0],
            amount: 1
          })
          msg.channel.send('Transaction recorded successfully')
        } catch (e) {
          if (e) {
              return msg.channel.send(`err: ${e}`)
          } else {
              return msg.channel.send(`ERROR: ${e}`)
          }
        }
      }
      
    await Transaction.sync();
  },
};
