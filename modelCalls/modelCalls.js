const db = require('../config/database');
const Transaction = require('../models/Transaction')
const Debt = require('../models/Debt')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    userTransBalance,
    userDebtBalance,
    debtBalanceBetween,
    transBalanceBetween
}

function userTransBalance(payingUser) {
    return Transaction.findAll({
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

function userDebtBalance(owingUser) {
    return Debt.findAll({
        where: {
            owing_user: owingUser
        },
        attributes: [
            'owing_user',
            [db.fn('sum', db.col('amount')), 'total'],
        ],
        group: ['owing_user'],
    });

}

function transBalanceBetween(payingUser, receivingUser) {
    return Transaction.findAll({
        where: {
            [Op.and]: [{
                receiving_user: receivingUser,
                paying_user: payingUser

            }]
        },
        attributes: [
            'paying_user',
            [db.fn('SUM', db.col('amount')), 'total'],
        ],
        group: ['paying_user'],
    })

}

function debtBalanceBetween(owingUser, collectingUser) {
    return Debt.findAll({
        where: {
            owing_user: owingUser,
            collecting_user: collectingUser

        },
        attributes: [
            'owing_user',
            [db.fn('sum', db.col('amount')), 'total'],
        ],
        group: ['owing_user'],
    })

}