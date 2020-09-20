const db = require('../config/database');
const Sequelize = require('sequelize');
const Transaction = require('../models/Transaction');
Op = Sequelize.Op
module.exports = {
    name: 'balancebetween',
    description: 'Fetching the balance between two tagged users',
    async execute(msg, args) {
        values = msg.mentions.users.map((user) => {
            return [user.id, user.username];
        });

        if (msg.mentions.users.size == 2) {
            payingBal = await Transaction.findAll({
                where: {
                    [Op.and]: [{
                            paying_user: values[0][0]
                        },
                        {
                            receiving_user: values[1][0]
                        }
                    ]
                },
                attributes: [
                    'paying_user',
                    [db.fn('sum', db.col('amount')), 'total'],
                ],
                group: ['paying_user']
            })

            receivingBal = await Transaction.findAll({
                where: {
                    [Op.and]: [{
                            paying_user: values[1][0]
                        },
                        {
                            receiving_user: values[0][0]
                        }
                    ]
                },
                attributes: [
                    'receiving_user',
                    [db.fn('sum', db.col('amount')), 'total'],
                ],
                group: ['receiving_user']
            })

            let payBal;
            let recBal;

            console.log(payingBal)
            if (payingBal.length == 0 && receivingBal.length == 0) {
                return msg.channel.send(`${values[0][1]} and ${values[1][1]} are even`)
                recBal = receivingBal[0].dataValues.total;
            } else if (payingBal.length == 1 && receivingBal.length == 0) {
                payBal = payingBal[0].dataValues.total;
                return msg.channel.send(`${values[0][1]} owes ${values[1][1]} ${payBal}`)
            } else if (payBal > recBal) {
                return msg.channel.send(`${values[0][1]} owes ${values[1][1]} ${payBal - recBal}`)
            } else {
                return msg.channel.send(`${values[1][1]} owes ${values[0][1]} ${recBal - payBal}`)
            }
        } else {
            return msg.channel.send('You must tag 2 users to check their balance')
        }
    },
};