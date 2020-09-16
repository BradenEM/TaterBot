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
    
},{
    timestamps: false
});

module.exports = User