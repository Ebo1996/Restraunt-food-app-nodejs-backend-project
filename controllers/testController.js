// testController.js - Fix the incomplete function
const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Test User API"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Test API",
      error
    });
  }
};

module.exports = { testUserController };