const { createStatistics } = require("./createStatistics");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  createStatistics: ctrlWrapper(createStatistics),
};
