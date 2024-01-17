const { Product } = require("../../models/productsModel");

const productsFromAllOnFilter = async (req, res, next) => {
  console.log(
    "1.1 - це contact Controller - exercisesFilter",
    req.user._id,
    req.user.name,
    "blood- ",
    req.user.blood,
    "Filter- ",
    req.query
  ); //  searchCategory(category) - meat, sausage , fish , berries &
  // searchWord(title) - beff , Cedar flour, Cedar flour, marlin &
  // searchFilter(filter) - all , recommended , notRecommended

    const userBlood = req.user.blood;
  
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

  const searchCategory = req.query.category;
  const searchWord = req.query.title;
  const searchFilter = req.query.filter;

  console.log(
    "1.2 - це contact Controller - exercisesFilter",
    { searchCategory },
    { searchWord },
    { searchFilter }
  );

  const queryAll = {
    category: searchCategory,
    title: { $regex: searchWord, $options: "i" },
  };

  const queryRecommended = {
    [groupBlood]: true,
    category: searchCategory,
    title: { $regex: searchWord, $options: "i" },
  };

  const queryNotRecommended = {
    [groupBlood]: { $ne: true },
    category: searchCategory,
    title: { $regex: searchWord, $options: "i" },
  };

  switch (searchFilter) {
    case "all":
      query = queryAll;
      break;
    case "recommended":
      query = queryRecommended;
      break;
    case "notRecommended":
      query = queryNotRecommended;
      break;

    default:
      query = queryAll;
  }

  console.log("1.3 - це contact Controller - exercisesFilter", { query });

  const dataUser = await Product.find(query).exec();

  const numberProductsRecommended = dataUser.length;

  console.log("1.4 -  - listUser", { numberProductsRecommended });

  res.status(200).json({ numberProductsRecommended, dataUser });

  console.log("це contact Controller - listUser", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

module.exports = {
  productsFromAllOnFilter,
};
