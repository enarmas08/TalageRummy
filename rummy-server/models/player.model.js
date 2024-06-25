const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        field: 'userid'
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username'
    },
    totalWin: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'totalwin'
    },
    totalLose: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'totallose'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'createdat'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updatedat'
    }
}, {
    tableName: 'players',
    timestamps: true
});

// Association
Player.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Player, { foreignKey: 'userId' });

module.exports = Player;
