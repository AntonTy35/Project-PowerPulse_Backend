const express = require("express");

const {
  validateBody,
  authenticate,
} = require("../../middlewares");
const { userSchemas } = require("../../models/user");

const ctrl = require("../../controllers/products");

const jsonParser = express.json();
const router = express.Router();

router.get("/categories", authenticate, ctrl.productsCategories);
router.get("/", authenticate, ctrl.productsAll);
router.get(
  "/:allOnFilter",
  authenticate,
  ctrl.productsFromAllOnFilter
);
router.get("/:blood/recommended", authenticate, ctrl.productsRecommended);
router.get(
  "/:blood/not-recommended",
  authenticate,
  ctrl.productsNotRecommended
);

module.exports = router;