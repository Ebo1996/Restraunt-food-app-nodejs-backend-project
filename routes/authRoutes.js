const express = require('express')
const router = express.Router()

//REGISTER || POST
router.post('/register', registerController)

module.exports = router