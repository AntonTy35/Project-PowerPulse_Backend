const { productsCategories } = require("./productsCategories");
const { productsFromAllOnFilter } = require("./productsFromAllOnFilter");


const { ctrlWrapper } = require("../../helpers");

module.exports = {
  productsCategories: ctrlWrapper(productsCategories),  
  productsFromAllOnFilter: ctrlWrapper(productsFromAllOnFilter),  
};
