/*
This code creates the routes for question CRUD our application.
================================
Author: Gunjan Vazirani
Last Updated: 04-04-2024
================================
*/

const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/QuestionController");

// GET methods
router.get("/get/all", questionController.getAllQuestions);
router.get("/get/:id", questionController.getQuestionById);

// PUT methods
router.put("/update/:id", questionController.updateQuestion);

// POST methods
router.post("/add", questionController.addQuestion);

// DELETE methods
router.delete("/delete/:id", questionController.deleteQuestionById);

module.exports = router;
