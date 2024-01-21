const signup = require("./signup");
const verify = require("./verify");
const signin = require("./signin");
const logout = require("./logout");
const updateUserParams = require("./updateUserParams");
const getCurrent = require("./current ");
const avatar = require("./avatar");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  signup: ctrlWrapper(signup),
  verify: ctrlWrapper(verify),
  signin: ctrlWrapper(signin),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateUserParams: ctrlWrapper(updateUserParams),
  avatar: ctrlWrapper(avatar),
};
