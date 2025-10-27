const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const registerValidation = [
  body('userName')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email')
    .trim()
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9]{10,15}$/).withMessage('Phone number must be 10-15 digits'),
  body('address')
    .notEmpty().withMessage('Address is required'),
  handleValidationErrors
];

const loginValidation = [
  body('email')
    .trim()
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2 }).withMessage('Category name must be at least 2 characters'),
  body('description')
    .optional()
    .trim(),
  handleValidationErrors
];

const foodValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Food name is required')
    .isLength({ min: 2 }).withMessage('Food name must be at least 2 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Food description is required'),
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Valid category ID is required'),
  body('image')
    .notEmpty().withMessage('Food image is required'),
  handleValidationErrors
];

module.exports = {
  registerValidation,
  loginValidation,
  categoryValidation,
  foodValidation
};


