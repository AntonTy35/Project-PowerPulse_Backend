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
      createdAt: user.createdAt,
    },
    bmr: user.bmr,
    token: user.token,
  });
};

module.exports = getCurrent;
