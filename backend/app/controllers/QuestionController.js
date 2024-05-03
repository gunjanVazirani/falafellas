/*
This code creates the controllers for our question creation feature for our application.
================================
Author: Gunjan Vazirani
Last Updated: 04-04-2024
================================
*/

const Question = require("../models/Question");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({
      message: "Questions retrieved",
      success: true,
      questions: questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question retrieved", success: true, question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getQuestionsByQuizId = async (req, res) => {
//   const { quiz_id } = req.params;

//   try {
//     const questions = await Question.find({ quizzes: { $in: [quiz_id] } });
//     if (questions.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No questions found for this quiz" });
//     }

//     res.json({ message: "Questions retrieved", success: true, questions });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const addQuestion = async (req, res) => {
  const { question_id, question, options, answer, marks } = req.body;

  try {
    if (question_id) {
      const existingQuestion = await Question.findById(question_id);
      if (!existingQuestion) {
        return res.status(404).json({ error: "Question not found" });
      }

      existingQuestion.quizzes.push(quiz_id);
      await existingQuestion.save();

      return res
        .status(200)
        .json({ message: "Existing question added to quiz", success: true });
    } else {
      if (!answer) {
        return res.status(400).json({ error: "Please add the correct answer" });
      }

      if (!question) {
        return res.status(400).json({ error: "Please add the question" });
      }

      if (options.length < 2) {
        return res.status(400).json({ error: "Minimum two options required" });
      }

      if (!marks) {
        return res
          .status(400)
          .json({ error: "Please add the marks this question holds" });
      }

      const newQuestion = await Question.create({
        question,
        options,
        answer,
        marks,
      });

      return res
        .status(201)
        .json({ message: "New question added to quiz", success: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question: updatedQuestion, options, answer, marks } = req.body;

  try {
    const existingQuestion = await Question.findById(id);
    if (!existingQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    existingQuestion.question = updatedQuestion;
    existingQuestion.options = options;
    existingQuestion.answer = answer;
    existingQuestion.marks = marks;

    await existingQuestion.save();

    res.json({ message: "Question updated", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProcess = await Question.deleteOne({ _id: id });
    if (deleteProcess.deletedCount === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const addQuestionToQuiz = async (req, res) => {
//   const { questionId } = req.params;
//   const { quizId } = req.body;

//   try {
//     const question = await Question.findById(questionId);
//     if (!question) {
//       return res.status(404).json({ error: "Question not found" });
//     }

//     if (question.quizzes.includes(quizId)) {
//       return res
//         .status(400)
//         .json({ error: "Question already exists in the quiz" });
//     }

//     question.quizzes.push(quizId);
//     await question.save();

//     res.json({ message: "Question added to quiz", success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

module.exports = {
  getQuestionById,
  getAllQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestionById,
};
