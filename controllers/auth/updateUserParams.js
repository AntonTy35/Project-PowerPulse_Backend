const { User } = require("../../models/user");
const calculateBMR = require("../../utils/calculateBMR");

const updateUserParams = async (req, res) => {
  try {
    const { email } = req.user;

    const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { desiredWeight, height, birthday, sex, levelActivity } = updatedUser;
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
        email: updatedUser.email,
        height: updatedUser.height,
        currentWeight: updatedUser.currentWeight,
        desiredWeight: updatedUser.desiredWeight,
        birthday: updatedUser.birthday,
        blood: updatedUser.blood,
        sex: updatedUser.sex,
        levelActivity: updatedUser.levelActivity,
      },
      bmr,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateUserParams;
