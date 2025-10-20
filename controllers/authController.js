// REGISTER
const registerController = async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error In Register API',
      error
    });
  }
};

module.exports = { registerController };