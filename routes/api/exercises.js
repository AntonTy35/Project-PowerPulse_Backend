const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/exercises");

const jsonParser = express.json();
const router = express.Router();

router.get("/filter", authenticate, ctrl.exercisesFilter);
router.get("/bodyPart", authenticate, ctrl.exercisesAll);

module.exports = router;
