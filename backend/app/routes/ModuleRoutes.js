const { Router } = require("express");

const router = Router();

const moduleController = require("../controllers/ModuleController");

router.get("/get/:id", moduleController.getModuleById);

router.post("/add-module", moduleController.addModule);

router.put("/update/:id", moduleController.updateModule);



module.exports = router;
