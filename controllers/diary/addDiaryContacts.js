const { Diary } = require("../../models/diaryModel");

const addDiaryContacts = async (req, res) => {
  const { productId, date, amount, calories } = req.body;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner: req.user.id,
      "addProducts.productId": productId,
      "addProducts.date": date,
    },
    {
      $set: {
        "addProducts.$.amount": amount,
        "addProducts.$.calories": calories,
      },
    },
    { new: true }
  ).populate("addProducts.productId");

  if (!diaryEntry) {
    const newDiaryEntry = await Diary.findOneAndUpdate(
      { owner: req.user.id, date },
      {
        $push: {
          addProducts: {
            productId,
            date,
            amount,
            calories,
          },
        },
      },
      { upsert: true, new: true }
    ).populate("addProducts.productId");

    return res.status(200).json({
      message: "Product added to diary successfully",
      data: newDiaryEntry,
    });
  }

  return res.status(200).json({
    message: "Product updated in diary successfully",
    data: diaryEntry,
  });
};

module.exports = addDiaryContacts;
