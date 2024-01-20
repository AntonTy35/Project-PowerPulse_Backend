require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

  await User.findByIdAndUpdate(user._id, { token }).exec();

  if (user.verify !== true) {
    throw HttpError(401, "Your account is not verify");
  }

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
    },
    token,
  });
};

module.exports = signin;
