const express = require("express");

const ctrl = require("../../controllers/statistics");

const jsonParser = express.json();
const router = express.Router();

router.get("/statisticsUser", ctrl.createStatistics);

module.exports = router;
