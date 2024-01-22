require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const newUser = await User.create({
    ...req.body,
    verificationToken,
    avatarURL,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
  newUser.token = token;
  newUser.createdAt = Date.now();
  await newUser.save();

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      blood: newUser.blood,
      sex: newUser.sex,
      height: newUser.height,
      currentWeight: newUser.currentWeight,
      desiredWeight: newUser.desiredWeight,
      levelActivity: newUser.levelActivity,
      avatarURL: newUser.avatarURL,
      birthday: newUser.birthday,
      createdAt: newUser.createdAt,
    },
    token,
  });
};

module.exports = signup;
