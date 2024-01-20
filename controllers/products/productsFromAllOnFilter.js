const { Product } = require("../../models/productsModel");

const productsFromAllOnFilter = async (req, res, next) => {
  console.log(
    "1.1 - це contact Controller - exercisesFilter",    
    "Filter- ",
    req.query
  ); 

  const userBlood = req.user.blood;
  var dataUser = [];
  var numberProductsRecommended = 0;
  const queryAllFromAll = {}; 

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
  };

  const searchCategory = req.query.category;
  let searchWord = req.query.title;
  const searchFilter = req.query.filter;

  if (searchCategory !== undefined) {
    query.category = searchCategory;
  };

  if (searchWord === undefined) {
    searchWord = "";
  };

  const queryAll = {
    category: searchCategory,
    filter: searchFilter,
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
    case "not-recommended":
      query = queryNotRecommended;
      break;

    default:
      query = queryAllFromAll;
  }; 

  console.log("1.3 - це contact Controller - ", { query });

  if (!query || query.filter === "all") {
    console.log("1.31 - це contact Controller - ", { query });
    var dataUser = await Product.find().exec();
  };

  if (query.category) {
    console.log("1.32 - це contact Controller - ", { query });
    var dataUser = await Product.find(query).exec();
  };

  var numberProductsRecommended = dataUser.length;

  console.log("1.4 -  - listUser", { numberProductsRecommended });

  res.status(200).json({ numberProductsRecommended, dataUser });
  
};

module.exports = {
  productsFromAllOnFilter,
};
