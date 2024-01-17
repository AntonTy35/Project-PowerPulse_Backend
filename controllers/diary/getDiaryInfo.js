const { Diary } = require("../../models/diaryModel");

const getDairyInfo = async (req, res) => {
  const dataInDiary = await Diary.find(
    {
      owner: req.user.id,
    },
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

  res.status(200).json(dataInDiary);
};

module.exports = getDairyInfo;
