const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')
require('mongoose-type-email')
// schema
noteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: false,
    default: ""
  }
}, { timestamps: true })


// model
const NoteModel = mongoose.model('Note', noteSchema)

// export
module.exports = NoteModel




