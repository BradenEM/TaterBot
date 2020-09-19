const {
    Sequelize,
    DataTypes
} = require('sequelize');
const db = require('../config/database');

const Transaction = db.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    paying_user: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'discord_id'
        }
    },
    receiving_user: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'discord_id'
        }
    },
    amount: {
        type: DataTypes.INTEGER

    },
    description: {
        type: DataTypes.TEXT
    }

}, {
    timestamps: false
});

module.exports = Transaction