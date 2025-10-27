const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected To Database ${mongoose.connection.host}`.bgCyan);
  } catch (error) {
    console.log("DB Error", error);
  }

};

module.exports = connectDb;