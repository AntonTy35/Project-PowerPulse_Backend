const { productsCategories } = require("./productsCategories");
const { productsAll } = require("./productsAll");
const { productsRecommended } = require("./productsRecommended");
const { productsNotRecommended } = require("./productsNotRecommended");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  productsCategories: ctrlWrapper(productsCategories),
  productsAll: ctrlWrapper(productsAll),
  productsRecommended: ctrlWrapper(productsRecommended),
  productsNotRecommended: ctrlWrapper(productsNotRecommended),
};
