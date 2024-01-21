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
router.get(
  "/filter",
  authenticate,
  ctrl.productsFromAllOnFilter
);


module.exports = router;