const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')
require('mongoose-type-email')
// schema
storySchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  characters: {
    type: [{ type: 'ObjectId', ref: 'Character' }],
    required: true,
    default: []
  },
  note: { type: 'ObjectId', ref: 'Note', required: true },
}, { timestamps: true })


// model
const StoryModel = mongoose.model('Story', storySchema)

// export
module.exports = StoryModel




