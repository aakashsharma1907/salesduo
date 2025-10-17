require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/db');
const optimizationRoutes = require('./src/optimizationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Synchronization
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

// Routes
app.use('/api', optimizationRoutes);

// Simple health check route
app.get('/', (req, res) => {
  res.send('Amazon Optimizer Backend is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

