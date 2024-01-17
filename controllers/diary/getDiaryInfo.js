const { Diary } = require("../../models/diaryModel");

const { HttpError } = require("../../helpers");

const getDairyInfo = async (req, res) => {
  const { id: owner } = req.user;
  const { date } = req.params;

  const dataInDiary = await Diary.findOne(
    { owner, date },
    "-createdAt -updatedAt"
  )
    .populate({
      path: "addProducts.productId",
      model: "product",
    })
    .populate({
      path: "addExercises.exerciseId",
      model: "exercise",
    });

  if (
    !dataInDiary ||
    (dataInDiary.addProducts.length === 0 &&
      dataInDiary.addExercises.length === 0)
  )
    throw HttpError(404, "No data found for the given date");

  res.status(200).json(dataInDiary);
};

module.exports = getDairyInfo;
