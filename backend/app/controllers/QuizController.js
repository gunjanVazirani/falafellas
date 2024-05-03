/*
This code creates the controllers for our quiz creation feature for our application.
================================
Author: Gunjan Vazirani
Last Updated: 04-04-2024
================================
*/

const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    const quizzesWithQuestions = await Promise.all(
      quizzes.map(async (quiz) => {
        const questions = await Question.find({ _id: { $in: quiz.questions } });
        return {
          _id: quiz._id,
          name: quiz.name,
          timeLimit: quiz.timeLimit,
          minimumMarks: quiz.minimumMarks,
          deadline: quiz.deadline,
          questions: questions,
        };
      })
    );

    res.json({
      message: "Quizzes retrieved",
      success: true,
      quizzes: quizzesWithQuestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const questions = await Question.find({ _id: { $in: quiz.questions } });
    const quizWithQuestions = {
      _id: quiz._id,
      name: quiz.name,
      timeLimit: quiz.timeLimit,
      minimumMarks: quiz.minimumMarks,
      deadline: quiz.deadline,
      questions: questions,
    };

    res.json({
      message: "Quiz retrieved",
      success: true,
      quiz: quizWithQuestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { name, timeLimit, minimumMarks, deadline, description, questions } =
    req.body;

  try {
    const invalidQuestionIds = await Question.find({
      _id: { $nin: questions.map((question) => question._id) },
    });

    if (!invalidQuestionIds.length > 0) {
      return res.status(400).json({ error: "Invalid question IDs provided" });
    }

    const existingQuiz = await Quiz.findById(id);
    if (!existingQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    existingQuiz.name = name;
    existingQuiz.timeLimit = timeLimit;
    existingQuiz.minimumMarks = minimumMarks;
    existingQuiz.deadline = deadline;
    existingQuiz.description = description;

    await existingQuiz.save();

    const updatedQuestions = await Promise.all(
      questions.map(async (question) => {
        const questionToUpdate = await Question.findById(question._id);
        if (questionToUpdate) {
          questionToUpdate.question = question.question;
          questionToUpdate.options = question.options;
          questionToUpdate.answer = question.answer;
          questionToUpdate.marks = question.marks;
          return questionToUpdate.save();
        }
      })
    );

    res.json({
      message: "Quiz and associated questions updated",
      success: true,
      quiz: existingQuiz,
      updatedQuestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addQuiz = async (req, res) => {
  const { name, timeLimit, minimumMarks, deadline, description, questions } =
    req.body;

  try {
    const questionIds = [];

    // Iterate through the questions
    for (const questionData of questions) {
      const { _id: questionId } = questionData;

      // Check if the question with the given ID exists
      const existingQuestion = await Question.findById(questionId);

      if (existingQuestion) {
        // If the question exists, add its ID to the list
        questionIds.push(questionId);
      } else {
        // If the question doesn't exist, create a new question
        const newQuestion = await Question.create(questionData);
        questionIds.push(newQuestion._id); // Add the ID of the newly created question
      }
    }

    // Create the new quiz with the list of question IDs
    const newQuiz = await Quiz.create({
      name,
      description,
      timeLimit,
      minimumMarks,
      deadline,
      questions: questionIds,
    });

    return res.status(201).json({
      message: "New quiz and questions added",
      success: true,
      quiz: newQuiz,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuiz = await Quiz.findById(id);
    if (!deletedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const deleteProcess = await Quiz.deleteOne({ _id: id });
    if (deleteProcess.deletedCount === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json({ message: "Quiz deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getQuizById,
  getAllQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuizById,
};
