const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous de configurer Sequelize

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'createdat'
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
