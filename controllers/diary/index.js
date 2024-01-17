const { ctrlWrapper } = require("../../helpers");

const addDiaryProducts = require("./addDiaryProducts");
const addDiaryExercises = require("./addDiaryExercises");
const delDiaryProducts = require("./delDiaryProducts");
const delDiaryExercises = require("./delDiaryExercises");
const getDiaryInfo = require("./getDiaryInfo");

module.exports = {
  addDiaryProducts: ctrlWrapper(addDiaryProducts),
  addDiaryExercises: ctrlWrapper(addDiaryExercises),
  delDiaryProducts: ctrlWrapper(delDiaryProducts),
  delDiaryExercises: ctrlWrapper(delDiaryExercises),
  getDiaryInfo: ctrlWrapper(getDiaryInfo),
};
