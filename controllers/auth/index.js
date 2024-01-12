const signup = require("./signup");
const signin = require("./signin");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  // verify: ctrlWrapper(verify),
  // resVerifyEmail: ctrlWrapper(resVerifyEmail),
  // signout: ctrlWrapper(signout),
  // forgotPassword: ctrlWrapper(forgotPassword),
};
