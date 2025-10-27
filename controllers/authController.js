const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_CONFIG } = require('../constants');

const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;

    if (!userName || !email || !password || !address || !phone) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "Email already registered, please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone
    });

    res.status(201).send({
      success: true,
      message: "Successfully registered",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: JWT_CONFIG.EXPIRES_IN }
    );

    res.status(200).send({
      success: true,
      message: 'Login Successfully',
      token,
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController };

