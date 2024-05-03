/*
This code defines the Module model for our Express application.
================================
Author: Aditya Pattani, Samit Mhatre
Last Updated: 03-04-2024
================================
*/

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ModuleSchema = new Schema({
    _id: String,
    numeric_id: Number,
    title: String,
    description: String,
    author: Number,
    videos_id: Array,
    quizzes_id: Array,
    duration: Number,
    is_mandatory: Boolean,
    reward_points: Number
}, { versionKey: false });

const Module = mongoose.model("Module", ModuleSchema);

module.exports = Module;

