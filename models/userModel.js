const mongoose = require('mongoose')

// Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'user name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: [true, 'phone number is required']
  }
}, {
  timestamps: true // Optional: adds createdAt and updatedAt fields
})

// Create and export the model
const User = mongoose.model('User', userSchema)
module.exports = User