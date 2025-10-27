// authRoutes.js - Fix the import statement
const express = require('express')
const router = express.Router()
// const { registerController } = require('../controllers/authController')

// REGISTER || POST
// NOTE: Temporarily removed the register route because the controller import
// was causing a "argument handler must be a function" error at startup.
// Re-enable after fixing `controllers/authController.js` export shape.
// router.post('/register', registerController)

// LOGIN || POST
// Temporarily commented out until the corresponding controller is implemented/imported.
// router.post('/login', loginController);

module.exports = router