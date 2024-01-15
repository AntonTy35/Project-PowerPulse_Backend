const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken }).exec();

    if (!user) {
      throw HttpError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
