const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with MySQL connection details from .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to true to see SQL queries
  }
);

// Define the Optimization Model
const Optimization = sequelize.define('Optimization', {
  asin: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  // Original Data
  original_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  original_bullets: {
    type: DataTypes.TEXT, // Stored as JSON string of an array of strings
  },
  original_description: {
    type: DataTypes.TEXT,
  },
  // Optimized Data
  optimized_title: {
    type: DataTypes.TEXT,
  },
  optimized_bullets: {
    type: DataTypes.TEXT, // Stored as JSON string of an array of strings
  },
  optimized_description: {
    type: DataTypes.TEXT,
  },
  optimized_keywords: {
    type: DataTypes.TEXT, // Stored as comma-separated string
  },
  // Timestamps are automatically handled by Sequelize (createdAt, updatedAt)
}, {
  tableName: 'optimizations',
  indexes: [
    {
      fields: ['asin'],
    },
  ],
});

module.exports = {
  sequelize,
  Optimization,
};

