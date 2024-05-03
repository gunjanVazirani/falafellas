/*
This code defines the Course model for our Express application.
================================
Author: Aditya Pattani, Samit Mhatre
Last Updated: 03-04-2024
================================
*/

const mongoose = require("mongoose");
const { Schema } = mongoose;


const CourseSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    deadline: Number,
    tutor: String,
    rating: Number,
    modules: Array,
    reward_points: Number,
    certificate: String
}, { versionKey: false });

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;

