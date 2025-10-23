// authRoutes.js - Fix the import statement
const express = require('express')
const router = express.Router()
const { registerController } = require('../controllers/authController')

// REGISTER || POST
router.post('/register', registerController)

//LOGIN ||POST
router.post('/login', loginController);

module.exports = router