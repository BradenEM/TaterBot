const Calls = require('../modelCalls/modelCalls')

module.exports = {
    name: 'balancebetween',
    description: 'Fetching the balance between two tagged users',
    async execute(msg, args) {
        values = msg.mentions.users.map((user) => {
            return [user.id, user.username];
        });


        if (msg.mentions.users.size == 2) {
            transBalance = await Calls.transBalanceBetween(values[0][0], values[1][0])
            debtBalance = await Calls.debtBalanceBetween(values[0][0], values[1][0])

            if (transBalance.length == 0 && debtBalance.length == 0) {
                return msg.channel.send(`${values[0][1]} and ${values[1][1]} are even`)
            } else if (debtBalance.length > 0 && transBalance.length == 0) {
                totalDebt = debtBalance[0].dataValues.total;
                return msg.channel.send(`${values[0][1]} owes ${values[1][1]} ${totalDebt}`)
            } else if (debtBalance.length > 0 && transBalance.length > 0) {
                if (transBalance[0].dataValues.total < debtBalance[0].dataValues.total) {
                    return msg.channel.send(`${values[0][1]} owes ${values[1][1]} ${debtBalance[0].dataValues.total - transBalance[0].dataValues.total}`)
                } else {
                    return msg.channel.send('Tell Braden what you did')
                }
            } else {
                return msg.channel.send('You must tag 2 user to check their balance')
            }
        } else {
            return msg.channel.send('You must include 2 tagged users to get balance between them.')
        }

    },
};