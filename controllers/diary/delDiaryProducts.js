const { Diary } = require("../../models/diaryModel");

const { HttpError } = require("../../helpers");

const delDiaryProducts = async (req, res) => {
  const { productId, date, amount, calories } = req.body;

  const { id: owner } = req.user;
  const { id } = req.params;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "addProducts._id": id,
    },
    {
      $pull: {
        addProducts: { _id: id },
      },
    },
    { new: true }
  ).populate("addProducts.productId");

  if (!diaryEntry) throw HttpError(404, "Product not found in diary");

  res.status(200).json({ message: "Product deleted from diary successfully" });
};

module.exports = delDiaryProducts;
