const {
    Sequelize,
    DataTypes
} = require('sequelize');
const db = require('../config/database');

const Debt = db.define('Debt', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    owing_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'discord_id'
        }
    },
    collecting_user: {
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

}, {
    timestamps: false
});

module.exports = Debt