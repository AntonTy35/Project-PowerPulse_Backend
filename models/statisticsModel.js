const { Schema, model } = require("mongoose");

const currentDate = new Date();

const diaryStatisticsSchema = new Schema(
  {
    allTotalAmount: {
      type: Number,
    },
    allTotalCalories: {
      type: Number,
    },
    allTotalTimeExercises: {
      type: Number,
    },
    allTotalCaloriesExercises: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const StatisticsAll = model("statisticsAll", diaryStatisticsSchema);
module.exports = { StatisticsAll };
