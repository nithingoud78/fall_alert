const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  ax: Number,
  ay: Number,
  az: Number,
  gx: Number,
  gy: Number,
  gz: Number,
  label: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Data", dataSchema);