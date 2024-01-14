const express = require("express");

const {
  validateBody,
  authenticate,
} = require("../../middlewares");
const { userSchemas } = require("../../models/user");

const ctrl = require("../../controllers/products");

const jsonParser = express.json();
const router = express.Router();

router.get("/products/categories", authenticate, ctrl.productsCategories);
router.get("/products", authenticate, ctrl.productsAll);
router.get("/products/:blood/recommended", authenticate, ctrl.productsRecommended);
router.get(
  "/products/:blood/not-recommended",
  authenticate,
  ctrl.productsNotRecommended
);

module.exports = router;