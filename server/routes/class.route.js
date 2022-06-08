const router = require("express").Router();
const actions = require("../controllers/class.controller");

router.route("/create-class").post(actions.createClass);
router.route("/classes").get(actions.getAllClasses);
router.route("/get-students").get(actions.getClassStudents);
router.route("/class-record").post(actions.classRecord);

module.exports = router;
