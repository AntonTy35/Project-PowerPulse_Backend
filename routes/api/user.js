const express = require("express");

const { authenticate } = require("../../middlewares");

// const { userSchemas } = require("../../models/user");

const ctrl = require("../../controllers/user");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
