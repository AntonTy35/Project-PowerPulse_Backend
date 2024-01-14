const { exercisesAll } = require("./exercisesAll");
const { exercisesFilter } = require("./exercisesFilter");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  exercisesAll: ctrlWrapper(exercisesAll),
  exercisesFilter: ctrlWrapper(exercisesFilter),
};
