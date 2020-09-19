const db = require('../config/database');
const Op = require('sequelize')
const Transaction = require('../models/Transaction')

module.exports = {
    name: 'balance',
    description: 'Fetching the balance of tagged user',
    async execute(msg, args) {
        values = msg.mentions.users.map((user) => {
            return [user.id, user.username];
        });

        if (msg.mentions.users.size == 1) {
            bal = await Transaction.findAll({
                where: {
                    paying_user: values[0][0]

                },
                attributes: [
                    'paying_user',
                    [db.fn('sum', db.col('amount')), 'total'],
                ],
                group: ['paying_user'],
            })

            totalBal = bal[0].dataValues.total
            return msg.channel.send(`${values[0][1]} has a balance of ${totalBal}`)
        } else {
            return msg.channel.send('You must tag 1 user to check their balance')
        }
    },
};