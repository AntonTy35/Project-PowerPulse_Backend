const { Diary } = require("../../models/diaryModel");

const { HttpError } = require("../../helpers");

const delDiaryExercises = async (req, res) => {
  const { exerciseId, date } = req.body;
  const { id: owner } = req.user;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "addExercises.exerciseId": exerciseId,
      "addExercises.date": date,
    },
    {
      $pull: {
        addExercises: {
          exerciseId,
          date,
        },
      },
    },
    { new: true }
  ).populate("addExercises.exerciseId");

  if (!diaryEntry) throw HttpError(404, "Exercise not found in diary");

  res.status(200).json({ message: "Exercise deleted from diary successfully" });
};

module.exports = delDiaryExercises;
