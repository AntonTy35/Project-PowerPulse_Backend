const signup = require("./signup");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  // signin: ctrlWrapper(signin),
  signup: ctrlWrapper(signup),
  // verify: ctrlWrapper(verify),
  // resVerifyEmail: ctrlWrapper(resVerifyEmail),
  // signout: ctrlWrapper(signout),
  // forgotPassword: ctrlWrapper(forgotPassword),
};
