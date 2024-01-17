const { Diary } = require("../../models/diaryModel");

const delDiaryExercises = async (req, res) => {
  const { exerciseId, date } = req.body;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner: req.user.id,
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

  if (!diaryEntry) {
    return res.status(404).json({ message: "Exercise not found in diary" });
  }

  res.status(200).json({ message: "Exercise deleted from diary successfully" });
};

module.exports = delDiaryExercises;
