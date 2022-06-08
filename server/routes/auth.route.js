const router = require("express").Router();
const actions = require("../controllers/auth.controller");

router.route("/login").post(actions.Login);

router.route("/loginotp").post(actions.LoginOTP);

router.route("/forgotpassword").post(actions.ForgotPassword);

router.route("/resetPassword/:resetToken").post(actions.resetPassword);

router.route("/getUser").get(actions.getUser);

router.route("/sendOtpAgain").post(actions.sendOTPAgain);

module.exports = router;
