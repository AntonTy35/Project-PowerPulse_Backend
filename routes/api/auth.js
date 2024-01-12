const express = require("express");

const { validateBody } = require("../../middlewares");

const { userSchemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validateBody(userSchemas.signupSchema), ctrl.signup);

router.post("/signin", validateBody(userSchemas.signinSchema), ctrl.signin);

module.exports = router;
