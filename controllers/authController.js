// authController.js
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

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
    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // create new user
    await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone
    });
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email or password",
      })
    }
    // check user
    const user = await userModel.findOne({ email: email, password: password });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "failed or password mismatch",
      });
    }
    res.status(200).send({
      success: true,
      message: 'Login Successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

//  Export both
module.exports = { registerController, loginController };

