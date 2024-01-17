const { User } = require("../../models/user");
const calculateBMR = require("../../utils/calculateBMR");

const updateUserParams = async (req, res) => {
  try {
    const { email } = req.user;
    const userParams = { ...req.body };

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { userParams },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { desiredWeight, height, birthday, sex, levelActivity } = userParams;
    const bmr = calculateBMR(
      desiredWeight,
      height,
      birthday,
      sex,
      levelActivity
    );

    res.status(200).json({
      user: {
        name: updatedUser.name,
        userParams: updatedUser.userParams,
      },
      bmr,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateUserParams;
