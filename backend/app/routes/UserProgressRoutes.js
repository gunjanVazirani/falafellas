const { Router } = require("express");

const router = Router();

const userProgressController = require("../controllers/UserProgressController");

router.post("/get/user-progress", userProgressController.getProgressByUserIDandModuleID);

router.post("/update/user-progress", userProgressController.updateUserProgressByUserIdAndModuleId);

router.post("/add/user-progress", userProgressController.addUserProgress);

module.exports = router;
