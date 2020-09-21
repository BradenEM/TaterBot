const e = require('express');
const Calls = require('../modelCalls/modelCalls');

module.exports = {
    name: 'debtBalance',
    description: 'Fetching the  debt balance of tagged user',
    async execute(msg, args) {
        values = msg.mentions.users.map((user) => {
            return [user.id, user.username];
        });


        if (msg.mentions.users.size == 1) {
            try {
                if (!Calls.userTransBalance(values[0][0]).length && !Calls.userDebtBalance(values[0][0]))
                    transBlance = await Calls.userTransBalance(values[0][0])
                debtBalance = await Calls.userDebtBalance(values[0][0])
                totalTrans = transBalance[0].dataValues.total
                totalDebt = debtBalance[0].dataValues.total
                total = totalDebt - totalTrans
                return msg.channel.send(`${values[0][1]} has a total debt balance of ${total}`)
            } catch (e) {
                console.log(e)
                return msg.channel.send(`${values[0][1]} has a balance of 0`)
            }
        } else {
            return msg.channel.send('You must tag 1 user to check their balance')
        }
    },
};