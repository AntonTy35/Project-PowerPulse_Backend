const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { userSchemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validateBody(userSchemas.signupSchema), ctrl.signup);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/signin", validateBody(userSchemas.signinSchema), ctrl.signin);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
