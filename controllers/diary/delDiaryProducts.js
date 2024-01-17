const { Diary } = require("../../models/diaryModel");

const delDiaryProducts = async (req, res) => {
  const { productId, date } = req.body;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner: req.user.id,
      "addProducts.productId": productId,
      "addProducts.date": date,
    },
    {
      $pull: {
        addProducts: {
          productId,
          date,
        },
      },
    },
    { new: true }
  ).populate("addProducts.productId");

  if (!diaryEntry) {
    return res.status(404).json({ message: "Product not found in diary" });
  }

  res.status(200).json({ message: "Product deleted from diary successfully" });
};

module.exports = delDiaryProducts;
