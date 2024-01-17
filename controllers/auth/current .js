const getCurrent = async (req, res) => {
  const user = req.user;

  res.status(201).json({
    user: {
      name: user.name,
      email: user.email,
      height: user.height,
      currentWeight: user.currentWeight,
      desiredWeight: user.desiredWeight,
      birthday: user.birthday,
      blood: user.blood,
      sex: user.sex,
      levelActivity: user.levelActivity,
      avatarURL: user.avatarURL,
      userParams: user.userParams,
    },
    token: user.token,
  });
};

module.exports = getCurrent;
