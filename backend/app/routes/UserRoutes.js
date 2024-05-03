/*
This code defines the routes for User Controller for our Express application.
================================
Author: Aditya Pattani
Last Updated: 03-04-2024
================================
*/

const { Router } = require("express");

const router = Router();

const userController = require("../controllers/UserController");
const rewardController = require("../controllers/RewardController");

// GET methods
router.get("/get/all", userController.getAllUsers);
router.get("/get/:id", userController.getUserById);

// PUT methods
router.put("/update/:id", userController.updateUser);

// POST methods
router.post("/add", userController.addUser);
router.post("/add/rewards/:userId", rewardController.getProgressByUserID);

// DELETE methods
router.delete("/delete/:id", userController.deleteUserById);

module.exports = router;

