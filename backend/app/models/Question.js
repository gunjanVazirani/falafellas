/*
This code creates the model for our question schema for our application.
================================
Author: Gunjan Vazirani
Last Updated: 04-04-2024
================================
*/

const mongoose = require("mongoose");
const { Schema } = mongoose;

const OptionSchema = new Schema(
  {
    optionId: String,
    optionString: String,
  },
  { _id: false }
);

const QuestionSchema = new Schema(
  {
    question: String,
    options: [OptionSchema], // Array of objects containing optionId and optionString
    answer: String,
    marks: Number,
  },
  { versionKey: false }
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
