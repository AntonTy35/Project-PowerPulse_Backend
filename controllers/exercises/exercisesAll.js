const { Exercise } = require("../../models/exercisesModel");
const { UsersAnatomy } = require("../../models/usersAnatomy");

const exercisesAll = async (req, res, next) => {
  const owner = req.user._id;
  const usersAnatomy = await UsersAnatomy.findOne({ owner: owner });
  console.log(
    "1.1 - це contact Controller - exercisesAll",
    req.user._id,
    req.user.name,
    "Exercise filter on All- ",
    req.query,
    usersAnatomy.dataAnatomy
  ); // 57 variants - bodyPart - back , cardio , upper arms ,waist

  const searchAnatomy = usersAnatomy.dataAnatomy;

  switch (searchAnatomy) {
    case "Body parts":
      searchFilter = req.query.bodyPart;
      break;
    case "Muscles":
      searchFilter = req.query.bodyPart;
      break;
    case "Equipment":
      searchFilter = req.query.bodyPart;
      break;

    default:
      searchFilter = req.query.bodyPart;
  }

  console.log("1.2 - ", { searchFilter }, { searchAnatomy });

  let queryBody = {
    ...(searchFilter !== undefined && { bodyPart: searchFilter }),
  };

  let queryMuscles = {
    ...(searchFilter !== undefined && { target: searchFilter }),
  };

  let queryEquipment = {
    ...(searchFilter !== undefined && { equipment: searchFilter }),
  };

  switch (searchAnatomy) {
    case "Body parts":
      query = queryBody;
      break;
    case "Muscles":
      query = queryMuscles;
      break;
    case "Equipment":
      query = queryEquipment;
      break;

    default:
      query = queryBody;
  }

  console.log("1.3 - exercisesFilter", { searchAnatomy }, { query });

  const dataUser = await Exercise.find(query).exec();

  const numberProductsBase = dataUser.length;

  console.log("1.4 -  - listUser", { numberProductsBase });

  res.status(200).json(dataUser);
  
};

module.exports = {
  exercisesAll,
};
