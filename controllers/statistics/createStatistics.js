const { Diary } = require("../../models/diaryModel");
const { StatisticsAll } = require("../../models/statisticsModel");
const { Exercise } = require("../../models/exercisesModel");
const { User } = require("../../models/user");

async function createStatisticsAll() {
  try {
    const allStatistics = new StatisticsAll({
      allTotalAmount: 0,
      allTotalCalories: 0,
      allTotalTimeExercises: 0,
      allTotalCaloriesExercises: 0,
    });

    await allStatistics.save();
    console.log("Нова база даних була створена успішно.");
  } catch (error) {
    console.error("Помилка при створенні нової бази даних:", error);
  }
}

async function updateStatistics(newData) {
  try {
    const currentStatistics = await StatisticsAll.findOne();

    currentStatistics.allTotalAmount = newData.allTotalAmount;
    currentStatistics.allTotalCalories = newData.allTotalCalories;
    currentStatistics.allTotalTimeExercises = newData.allTotalTimeExercises;
    currentStatistics.allTotalCaloriesExercises =
      newData.allTotalCaloriesExercises;

    await currentStatistics.save();
    console.log("Дані в базі було успішно оновлено.");
  } catch (error) {
    console.error("Помилка при оновленні даних в базі:", error);
  }
  return;
}

const createStatistics = async (req, res, next) => {
  const handleDiaryChange = async () => {
    const users = await Diary.find().exec();
    let n = 0;
    let allTotalCalories = 0;
    let allTotalAmount = 0;

    users.forEach((user) => {
      n += 1;

      const addProducts = user.addProducts;
      let totalCalories = 0;
      let totalAmount = 0;

      addProducts.forEach((product) => {
        totalCalories += product.calories;
        totalAmount += product.amount;
      });
      allTotalCalories += totalCalories;
      allTotalAmount += totalAmount;
    });

    let k = 0;
    let allTotalCaloriesExercises = 0;
    let allTotalTimeExercises = 0;

    users.forEach((user) => {
      k += 1;

      const addExercises = user.addExercises;
      let totalCaloriesExercises = 0;
      let totalTimeExercises = 0;

      addExercises.forEach((product) => {
        totalCaloriesExercises += product.calories;
        totalTimeExercises += product.time;
      });
      allTotalCaloriesExercises += totalCaloriesExercises;
      allTotalTimeExercises += totalTimeExercises;
    });

    const allStatistics = {
      allTotalAmount,
      allTotalCalories,
      allTotalTimeExercises,
      allTotalCaloriesExercises,
    };

    const dataStatistics = await StatisticsAll.find().exec();

    if (dataStatistics.length === 0) {
      createStatisticsAll();
    }
    updateStatistics(allStatistics);
  };

  Diary.watch().on("change", handleDiaryChange);

  const result = await StatisticsAll.find().exec();

  const allStatistics = { ...result };
  const allTotalAmount = allStatistics[0].allTotalAmount;
  const allTotalCalories = allStatistics[0].allTotalCalories;
  const allTotalTimeExercises = allStatistics[0].allTotalTimeExercises;
  const allTotalCaloriesExercises = allStatistics[0].allTotalCaloriesExercises;
  const currentUsers = await User.find().exec();
  const numberRegistered = currentUsers.length;
  const currentExercises = await Exercise.find().exec();
  const numberExercises = currentExercises.length;

  const finalResult = {
    numberRegistered,
    numberExercises,
    allTotalAmount,
    allTotalCalories,
    allTotalTimeExercises,
    allTotalCaloriesExercises,
  };
  console.log("10-10", { finalResult });
  res.status(200).json({ finalResult });
};

module.exports = {
  createStatistics,
};
