/*
This code defines the routes for Course Controller for our Express application.
================================
Author: Aditya Pattani
Last Updated: 03-04-2024
================================
*/

const { Router } = require("express");

const router = Router();

const courseController = require("../controllers/CourseController");

// GET methods
router.get("/get/all", courseController.getAllCourses);
router.get("/get/:id", courseController.getCourseById)

// PUT methods
router.put("/update/:id", courseController.updateCourse);

// POST methods
router.post("/add", courseController.addCourse);

// DELETE methods
router.delete("/delete/:id", courseController.deleteCourseById);

module.exports = router;