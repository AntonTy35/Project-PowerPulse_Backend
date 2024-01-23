const getCurrent = async (req, res) => {
  const user = req.user;

  res.status(201).json({
    user: {
      name: user.name,
      email: user.email,
      blood: user.blood,
      sex: user.sex,
      height: user.height,
      currentWeight: user.currentWeight,
      desiredWeight: user.desiredWeight,
      levelActivity: user.levelActivity,
      avatarURL: user.avatarURL,
      birthday: user.birthday,
      bmr: user.bmr,
      createdAt: user.createdAt,
    },
    token: user.token,
  });
};

module.exports = getCurrent;
