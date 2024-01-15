const express = require("express");

const { authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/diary");

const router = express.Router();

router.post("/diary/contacts", authenticate, ctrl.addDiaryContacts);
router.post("/diary/exercises", authenticate, ctrl.addDiaryExercises);

router.delete("/diary/contacts", authenticate, ctrl.delDiaryContacts);
router.delete("/diary/exercises", authenticate, ctrl.delDiaryExercises);

router.get("/diary", authenticate, ctrl.getDiaryInfo);

module.exports = router;
