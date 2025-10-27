const categoryModel = require('../models/categoryModel');

const createCategoryController = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name) {
      return res.status(400).send({
        success: false,
        message: 'Category name is required'
      });
    }

    const category = await categoryModel.create({
      name,
      description,
      image
    });

    res.status(201).send({
      success: true,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error creating category',
      error: error.message
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).send({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error updating category',
      error: error.message
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error deleting category',
      error: error.message
    });
  }
};

const getSingleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).send({
      success: true,
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching category',
      error: error.message
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getSingleCategoryController
};


