const { Diary } = require("../../models/diaryModel");

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

  if (!dataInDiary) {
    return res
      .status(404)
      .json({ message: "No data found for the given date" });
  }

  res.status(200).json(dataInDiary);
};

module.exports = getDairyInfo;
