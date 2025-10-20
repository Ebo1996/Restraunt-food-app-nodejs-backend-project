const userModel = require("../models/userModel");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    // validation
    if (!username || !email || !password || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide All Fields'
      });
    }

    // check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: 'Email Already Registered please Login'
      });
    }

    //create new user
    const user = await userModel.create({ username, email, password, address, phone })
    res.status(201).send({
      success: true,
      message: 'succesfully Registered'
    });

    // Add user creation logic here
    // const newUser = await userModel.create({...});

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error In Register API',
      error
    });
  }
};

module.exports = registerController;