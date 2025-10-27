const express = require('express');
const { registerController, loginController } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middleware/validationMiddleware');
const { authLimiter } = require('../middleware/securityMiddleware');

const router = express.Router();

router.post('/register', registerValidation, registerController);
router.post('/login', authLimiter, loginValidation, loginController);

module.exports = router;
