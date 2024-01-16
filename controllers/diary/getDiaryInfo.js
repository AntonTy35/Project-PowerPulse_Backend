const { format } = require("date-fns");

const getDairyInfo = (req, res) => {
  const date = new Date();
  const formattedDate = format(date, "dd/MM/yyyy");
  console.log(formattedDate);
};

module.exports = getDairyInfo;
