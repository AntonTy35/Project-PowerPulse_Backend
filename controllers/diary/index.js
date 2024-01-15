const { ctrlWrapper } = require("../../helpers");

const addDiaryContacts = require("./addDiaryContacts");
const addDiaryExercises = require("./addDiaryExercises");
const delDiaryContacts = require("./delDiaryContacts");
const delDiaryExercises = require("./delDiaryExercises");
const getDiaryInfo = require("./getDiaryInfo");

module.exports = {
  addDiaryContacts: ctrlWrapper(addDiaryContacts),
  addDiaryExercises: ctrlWrapper(addDiaryExercises),
  delDiaryContacts: ctrlWrapper(delDiaryContacts),
  delDiaryExercises: ctrlWrapper(delDiaryExercises),
  getDiaryInfo: ctrlWrapper(getDiaryInfo),
};
