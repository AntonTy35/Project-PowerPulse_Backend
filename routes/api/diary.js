const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/diary");
const { diarySchemas } = require("../../models/diaryModel");

const router = express.Router();

router.post(
  "/products",
  authenticate,
  validateBody(diarySchemas.productsSchema),
  ctrl.addDiaryProducts
);

router.post(
  "/exercises",
  authenticate,
  validateBody(diarySchemas.exercisesSchema),
  ctrl.addDiaryExercises
);

router.delete("/products/:id", authenticate, ctrl.delDiaryProducts);

router.delete("/exercises/:id", authenticate, ctrl.delDiaryExercises);

router.get("/:date", authenticate, ctrl.getDiaryInfo);

module.exports = router;
