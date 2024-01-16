const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/diary");
const { diarySchemas } = require("../../models/diaryModel");

const router = express.Router();

router.post(
  "/diary/products",
  authenticate,
  validateBody(diarySchemas.productsSchema),
  ctrl.addDiaryContacts
);

router.post(
  "/diary/exercises",
  authenticate,
  validateBody(diarySchemas.exercisesSchema),
  ctrl.addDiaryExercises
);

router.delete("/diary/products", authenticate, ctrl.delDiaryContacts);

router.delete("/diary/exercises", authenticate, ctrl.delDiaryExercises);

router.get("/diary", authenticate, ctrl.getDiaryInfo);

module.exports = router;
