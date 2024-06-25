const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'games',
  timestamps: false // Désactive les timestamps createdAt et updatedAt
});

module.exports = Game;
