const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

//dot en configuration
dotenv.config();

//DB connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the server</h1>');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(chalk.white.bgMagenta(`✅ Server running on port ${PORT}`));
});
