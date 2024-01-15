const { Filter } = require("../../models/filtersModel");

const exercisesFilter = async (req, res, next) => {
  console.log(
    "1.1 - це contact Controller - exercisesFilter",
    req.user._id,
    req.user.name,
    "Filter- ",
    req.query
  ); // 3 variants - filter - Body parts , Muscles , Equipment

  const query = req.query;
  const dataUser = await Filter.find(query).exec();

  const numberProductsBase = dataUser.length;

  console.log("1.2 -  - listUser", { numberProductsBase });

  res.status(200).json(dataUser);

  console.log("це contact Controller - listUser", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

module.exports = {
  exercisesFilter,
};
