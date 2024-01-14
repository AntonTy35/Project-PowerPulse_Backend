const getCurrent = require("./current ");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
