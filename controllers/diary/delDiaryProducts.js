const { Diary } = require("../../models/diaryModel");

const { HttpError } = require("../../helpers");

const delDiaryProducts = async (req, res) => {
  const { productId, date } = req.body;
  const { id: owner } = req.user;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
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

  if (!diaryEntry) throw HttpError(404, "Product not found in diary");

  res.status(200).json({ message: "Product deleted from diary successfully" });
};

module.exports = delDiaryProducts;
