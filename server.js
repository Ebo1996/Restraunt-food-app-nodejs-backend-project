const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const chalk = require('chalk');

// Load env variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the server</h1>');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(chalk.white.bgMagenta(`✅ Server running on port ${PORT}`));
});
