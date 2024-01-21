const axios = require("axios");
const { Filter } = require("../../models/filtersModel");
const { UsersAnatomy } = require("../../models/usersAnatomy");

const exercisesFilter = async (req, res, next) => {
  console.log(
    "1.0 - це contact Controller - exercisesFilter",
    req.user._id,
    req.user.name,
    "Filter- ",
    req.query
  ); // 3 variants - filter - Body parts , Muscles , Equipment

  var dataUser = [];
  const query = req.query;
  console.log("1.1 -  - listUser", { query });

  if (
    query.filter !== "Body parts" &&
    query.filter !== "Muscles" &&
    query.filter !== "Equipment"
  ) {
    console.log("query-  - pusto");
  }

  if (
    query.filter === "Body parts" ||
    query.filter === "Muscles" ||
    query.filter === "Equipment"
  ) {
    const owner = req.user._id;
    const queryAnatomy = req.query.filter;
    const usersAnatomy = await UsersAnatomy.findOne({ owner: owner });
    if (usersAnatomy) {
      usersAnatomy.dataAnatomy = queryAnatomy;
      await usersAnatomy.save();
    } else {
      const newUsersAnatomy = new UsersAnatomy({
        owner: owner,
        dataAnatomy: queryAnatomy,
      });
      await newUsersAnatomy.save();
    }

    var dataUser = await Filter.find(query).exec();

    console.log("1.2 -  - listUser");
  } else {
    var dataUser = await Filter.find().exec();
  }

  const numberProductsBase = dataUser.length;

  console.log("1.6 -  - listUser", { numberProductsBase });

  res.status(200).json(dataUser);
};

module.exports = {
  exercisesFilter,
};
