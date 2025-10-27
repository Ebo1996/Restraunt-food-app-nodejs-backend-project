const express = require('express');
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  updateFoodController,
  deleteFoodController,
  getFoodByCategoryController
} = require('../controllers/foodController');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { foodValidation } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/create', requireSignIn, isAdmin, foodValidation, createFoodController);
router.get('/all', getAllFoodController);
router.get('/category/:categoryId', getFoodByCategoryController);
router.get('/:id', getSingleFoodController);
router.put('/update/:id', requireSignIn, isAdmin, foodValidation, updateFoodController);
router.delete('/delete/:id', requireSignIn, isAdmin, deleteFoodController);

module.exports = router;

