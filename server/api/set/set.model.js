'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LetterSchema = new Schema({
  character: String,
  qty: Number
});

var SetSchema = new Schema({
  title: String,
  letters: [LetterSchema]
});

module.exports = mongoose.model('Set', SetSchema);