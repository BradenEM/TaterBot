const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    discord_id: {
        type: DataTypes.NUMBER,
        unique: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.TEXT
    }, 
    balance: {
        type: DataTypes.INTEGER,
        default: 0
    }
    
},{
    timestamps: false
});

module.exports = User