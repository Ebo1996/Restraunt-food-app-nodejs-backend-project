// testRoutes.js - Use the controller properly
const express = require('express');
const { testUserController } = require('../controllers/testController');

const router = express.Router();

// router GET | POST | PUT | DELETE |UPDATE
router.get('/test-user', testUserController);

module.exports = router;