const foodModel = require('../models/foodModel');

const createFoodController = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const food = await foodModel.create({
      name,
      description,
      price,
      category,
      image,
      vendor: req.user.userId
    });

    res.status(201).send({
      success: true,
      message: 'Food item created successfully',
      food
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error creating food item',
      error: error.message
    });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = {};
    if (sort === 'price-asc') sortOption = { price: 1 };
    if (sort === 'price-desc') sortOption = { price: -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };

    const foods = await foodModel
      .find(query)
      .populate('category', 'name')
      .populate('vendor', 'userName email')
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await foodModel.countDocuments(query);

    res.status(200).send({
      success: true,
      count: foods.length,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      foods
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching food items',
      error: error.message
    });
  }
};

const getSingleFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await foodModel
      .findById(id)
      .populate('category', 'name')
      .populate('vendor', 'userName email');

    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'Food item not found'
      });
    }

    res.status(200).send({
      success: true,
      food
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching food item',
      error: error.message
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image, available } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (category) updateData.category = category;
    if (image) updateData.image = image;
    if (available !== undefined) updateData.available = available;

    const food = await foodModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'Food item not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'Food item updated successfully',
      food
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error updating food item',
      error: error.message
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await foodModel.findByIdAndDelete(id);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'Food item not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'Food item deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error deleting food item',
      error: error.message
    });
  }
};

const getFoodByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const foods = await foodModel
      .find({ category: categoryId })
      .populate('category', 'name')
      .populate('vendor', 'userName email');

    res.status(200).send({
      success: true,
      count: foods.length,
      foods
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching foods by category',
      error: error.message
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  updateFoodController,
  deleteFoodController,
  getFoodByCategoryController
};


