const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true

  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
  }
}, {
  timestamps: true
});

categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);


