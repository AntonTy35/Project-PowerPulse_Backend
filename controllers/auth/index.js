const signup = require("./signup");
const signin = require("./signin");
const logout = require("./logout");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  logout: ctrlWrapper(logout),
};
