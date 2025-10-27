const express = require('express');
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getSingleCategoryController
} = require('../controllers/categoryController');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { categoryValidation } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/create', requireSignIn, isAdmin, categoryValidation, createCategoryController);
router.get('/all', getAllCategoryController);
router.get('/:id', getSingleCategoryController);
router.put('/update/:id', requireSignIn, isAdmin, categoryValidation, updateCategoryController);
router.delete('/delete/:id', requireSignIn, isAdmin, deleteCategoryController);

module.exports = router;

