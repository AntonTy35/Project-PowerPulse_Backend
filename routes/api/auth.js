const express = require("express");

const {
  validateBody,
  authenticate,
  updateAvatar,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validateBody(schemas.signupSchema), ctrl.signup);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/signin", validateBody(schemas.signinSchema), ctrl.signin);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/params",
  authenticate,
  validateBody(schemas.updateUserParamsSchema),
  ctrl.updateUserParams
);
router.patch(
  "/avatar",
  authenticate,
  updateAvatar.single("avatar"),
  ctrl.avatar
);

module.exports = router;
