const { Product } = require("../../models/productsModel");

const productsFromAllOnFilter = async (req, res, next) => {
  console.log("Filter- ", req.query);

  const userBlood = req.user.blood;
  var dataUser = [];
  var numberProductsRecommended = 0;
  const queryAllFromAll = {};

  const searchCategory = req.query.category;
  let searchWord = req.query.title;
  const searchFilter = req.query.filter;

  switch (userBlood) {
    case 1:
      groupBlood = "groupBloodNotAllowed.1";
      break;
    case 2:
      groupBlood = "groupBloodNotAllowed.2";
      break;
    case 3:
      groupBlood = "groupBloodNotAllowed.3";
      break;
    case 4:
      groupBlood = "groupBloodNotAllowed.4";
      break;
    default:
      groupBlood = "groupBloodNotAllowed.1";
  }

  let queryAll = {
    ...(searchWord !== undefined && {
      title: { $regex: searchWord, $options: "i" },
    }),
    ...(searchCategory !== undefined && { category: searchCategory }),
    ...(searchFilter !== undefined && { filter: searchFilter }),
  };

  let queryRecommended = {
    [groupBlood]: true,
    ...(searchWord !== undefined && {
      title: { $regex: searchWord, $options: "i" },
    }),
    ...(searchCategory !== undefined && { category: searchCategory }),
    ...(searchFilter !== undefined && { filter: searchFilter }),
  };

  let queryNotRecommended = {
    [groupBlood]: { $ne: true },
    ...(searchWord !== undefined && {
      title: { $regex: searchWord, $options: "i" },
    }),
    ...(searchCategory !== undefined && { category: searchCategory }),
    ...(searchFilter !== undefined && { filter: searchFilter }),
  };

  switch (searchFilter) {
    case "all":
      query = queryAll;
      break;
    case "recommended":
      query = queryRecommended;
      break;
    case "not-recommended":
      query = queryNotRecommended;
      break;

    default:
      query = queryAll;
  }

  if ((searchCategory || searchWord || searchFilter) !== undefined) {
    if ((searchCategory && searchWord && searchFilter) !== undefined) {
      var dataUser = await Product.find(query).exec();
      console.log("Block - 2");
    } else {
      var dataUser = await Product.find(query).exec();
      console.log("Block - 1");
    }
  }

  if (
    searchCategory === undefined &&
    searchWord === undefined &&
    searchFilter === undefined
  ) {
    console.log("Block - 0");
  }

  var numberProductsRecommended = dataUser.length;

  console.log("Filter - ", { numberProductsRecommended });

  res.status(200).json({ numberProductsRecommended, dataUser });
};

module.exports = {
  productsFromAllOnFilter,
};
