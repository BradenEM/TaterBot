const e = require('express');
const Calls = require('../modelCalls/modelCalls');

module.exports = {
    name: 'balance',
    description: 'Fetching the balance of tagged user',
    async execute(msg, args) {
        values = msg.mentions.users.map((user) => {
            return [user.id, user.username];
        });


        if (msg.mentions.users.size == 1) {
            try {
                balance = await Calls.userBalance(values[0][0])
                total = balance[0].dataValues.total
                return msg.channel.send(`${values[0][1]} has a balance of ${total}`)
            } catch (e) {
                console.log(e)
                return msg.channel.send(`${values[0][1]} has a balance of 0`)
            }
        } else {
            return msg.channel.send('You must tag 1 user to check their balance')
        }
    },
};