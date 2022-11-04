const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')
require('mongoose-type-email')

// schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true    
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String    
  },
  bio: {
    type: String
  },
  notes: {
    type: String
  },
  newUser: {
    type: Boolean,
    default: true
  },
  stories: {
    type: [{ type: 'ObjectId', ref: 'Story' }],
    default: []
  }
}, { timestamps: true })

// model
const User = mongoose.model('User', userSchema)

// export
module.exports = User




