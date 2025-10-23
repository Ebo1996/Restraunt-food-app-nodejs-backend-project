// authController.js
const userModel = require("../models/userModel");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;

    // validation
    if (!userName || !email || !password || !address || !phone) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "Email already registered, please login",
      });
    }

    // create new user
    await userModel.create({ userName, email, password, address, phone });
    res.status(201).send({
      success: true,
      message: "Successfully registered",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    // TODO: Implement login logic
    res.send("Login logic not yet implemented");
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

// ✅ Export both
module.exports = { registerController, loginController };
