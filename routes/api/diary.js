const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/diary");
const { diarySchemas } = require("../../models/diaryModel");

const router = express.Router();

router.post(
  "/diary/products",
  authenticate,
  validateBody(diarySchemas.productsSchema),
  ctrl.addDiaryProducts
);

router.post(
  "/diary/exercises",
  authenticate,
  validateBody(diarySchemas.exercisesSchema),
  ctrl.addDiaryExercises
);

router.delete("/diary/products/:id", authenticate, ctrl.delDiaryProducts);

router.delete("/diary/exercises/:id", authenticate, ctrl.delDiaryExercises);

router.get("/diary/:date", authenticate, ctrl.getDiaryInfo);

module.exports = router;
