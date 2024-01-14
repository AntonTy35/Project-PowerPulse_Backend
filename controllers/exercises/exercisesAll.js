const { Exercise } = require("../../models/exercisesModel");

const exercisesAll = async (req, res, next) => {
  console.log(
    "1.1 - це contact Controller - exercisesFilter",
    req.user._id,
    req.user.name,
    "Exercise filter on All- ",
    req.query
  ); // 57 variants - bodyPart - back , cardio , upper arms ,waist

  const query = req.query;
  const dataUser = await Exercise.find(query).exec();

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
  exercisesAll,
};
