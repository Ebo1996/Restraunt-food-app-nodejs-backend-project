// authRoutes.js - Fix the import statement
const express = require('express')
const router = express.Router()
const { registerController } = require('../controllers/authController')

// REGISTER || POST
router.post('/register', registerController)

module.exports = router