const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Card = sequelize.define('Card', {
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
  tableName: 'cards',
  timestamps: false // Désactive les timestamps createdAt et updatedAt
});

module.exports = Card;
