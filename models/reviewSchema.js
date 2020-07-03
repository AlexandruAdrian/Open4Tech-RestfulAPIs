const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  subject: { type: String, required: true },
  review: { type: String, required: true },
});

const ReviewModel = mongoose.model("Review", reviewSchema, "reviews");

module.exports = ReviewModel;
