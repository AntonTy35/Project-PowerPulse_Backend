const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { userSchemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validateBody(userSchemas.signupSchema), ctrl.signup);

router.post("/signin", validateBody(userSchemas.signinSchema), ctrl.signin);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
