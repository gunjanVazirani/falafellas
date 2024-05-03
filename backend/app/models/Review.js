const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    _id: String,
    course_id: Number,
    user_id: Number,
    rating: Number,
    description: String
}, { versionKey: false });

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;