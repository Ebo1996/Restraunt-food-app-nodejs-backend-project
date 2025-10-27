const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const { errorHandler, notFound } = require("./utils/errorHandler");
const { securityMiddleware, limiter } = require("./middleware/securityMiddleware");

dotenv.config();

connectDb();

const app = express();

app.use(securityMiddleware);
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan("dev"));
app.use('/api/', limiter);

app.use("/api/v1/auth", require('./routes/authRoutes'));
app.use("/api/v1/category", require('./routes/categoryRoutes'));
app.use("/api/v1/food", require('./routes/foodRoutes'));

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to Restaurant Food App API</h1>');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(colors.white.bgMagenta(`✅ Server running on port ${PORT}`));
});