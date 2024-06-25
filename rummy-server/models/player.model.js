const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalGamesWin: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  totalGamesPlay: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false,// Désactive les timestamps createdAt et updatedAt
  tableName: 'player'
});

module.exports = Player;
