/*
This code creates the routes for quiz CRUD our application.
================================
Author: Gunjan Vazirani
Last Updated: 04-04-2024
================================
*/

const { Router } = require("express");
const router = Router();
const quizController = require("../controllers/QuizController");

// GET methods
router.get("/get/all", quizController.getAllQuizzes);
router.get("/get/:id", quizController.getQuizById);

// PUT methods
router.put("/update/:id", quizController.updateQuiz);

// POST methods
router.post("/add", quizController.addQuiz);

// DELETE methods
router.delete("/delete/:id", quizController.deleteQuizById);

module.exports = router;
