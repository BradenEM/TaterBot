const db = require('../config/database');
const Transaction = require('../models/Transaction')

module.exports = {
    userBalance
}

async function userBalance(payingUser) {
    Transaction.findAll({
        where: {
            paying_user: payingUser
        },
        attributes: [
            'paying_user',
            [db.fn('sum', db.col('amount')), 'total'],
        ],
        group: ['paying_user'],
    })

}