const mongoose = require("mongoose");
const colors = require("colors");

// Function MongoDB database connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Database ${mongoose.connection.host}`,
      colors.bgCyan
    );
  } catch (error) {
    console.log("DB Error", error, colors.bgRed);
  }
};

module.exports = connectDb;
