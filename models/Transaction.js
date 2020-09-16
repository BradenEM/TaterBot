const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const Transaction = db.define('Transaction', {
    id: {
        type: DataTypes.NUMBER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    paying_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'discord_id'
          }
    }, 
    receiving_user: {
        type: DataTypes.INTEGER,
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
    
},{
    timestamps: false
});

module.exports = Transaction