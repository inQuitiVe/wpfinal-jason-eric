const mongoose = require("mongoose");

const Result = mongoose.model(
  "Result",
  new mongoose.Schema({
    user: String,
    context: String,
    num_result: Number,
    image: [String],
  })
);

module.exports = Result;