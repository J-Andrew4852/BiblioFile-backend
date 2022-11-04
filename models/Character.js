const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')
require('mongoose-type-email')
// schema
characterSchema = new mongoose.Schema({
  gender: {
    type: String,
    require: true
  },
  note: { type: 'ObjectId', ref: 'Note', required: true },
  fname: {
    type: String,
    require: true
  },
  lname: {
    type: String,
    require: true
  },
  age: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  job: {
    type: String,
    require: true
  },
  characterImage: {
    type: String,
    require: true
  },
  backgroundImage: {
    type: String,
    require: true
  },
  characterImage: {
    type: String,
    require: true
  },
  personalityTraits: [String],
  motivation: {
    type: String,
    require: true
  },
  motivators: [String],
  kindness: [Number],
  happiness: [Number],
  strength: [Number],
  wisdom: [Number],
  intelligence: [Number],
  stealth: [Number],
  bar1: [Number],
  bar2: [Number],
  bar3: [Number]
  
}, { timestamps: true })


// model
const CharacterModel = mongoose.model('Character', characterSchema)

// export
module.exports = CharacterModel




