const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
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
  tableName: 'rooms',
  timestamps: false // Désactive les timestamps createdAt et updatedAt
});

module.exports = Room;
