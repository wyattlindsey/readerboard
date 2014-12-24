'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SetSchema = new Schema({
  title: String,
  letters: [{
    character: String,
    qty: Number
  }]
});

module.exports = mongoose.model('Set', SetSchema);