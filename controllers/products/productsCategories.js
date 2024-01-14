const { ProductsCategory } = require("../../models/categoriesModel");

const productsCategories = async (req, res, next) => {
  console.log(
    "1.1 - це contact Controller - productsCategories",
    req.user._id,
    req.user.name,
    "blood- ",
    req.user.blood
  );

  const dataUser = await ProductsCategory.find().exec();

  const numberProductsCategoriesBase = dataUser.length;

  console.log("1.2 -  - listUser", { numberProductsCategoriesBase });

  res.status(200).json(dataUser);

  console.log("це contact Controller - listUser", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

module.exports = {
  productsCategories,
};
