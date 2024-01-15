const { productsCategories } = require("./productsCategories");
const { productsAll } = require("./productsAll");
const { productsFromAllOnFilter } = require("./productsFromAllOnFilter");
const { productsRecommended } = require("./productsRecommended");
const { productsNotRecommended } = require("./productsNotRecommended");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  productsCategories: ctrlWrapper(productsCategories),
  productsAll: ctrlWrapper(productsAll),
  productsFromAllOnFilter: ctrlWrapper(productsFromAllOnFilter),
  productsRecommended: ctrlWrapper(productsRecommended),
  productsNotRecommended: ctrlWrapper(productsNotRecommended),
};
