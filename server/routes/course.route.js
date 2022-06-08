const router = require('express').Router();
const actions = require('../controllers/course.controller');

router.route('/').get(actions.ViewAllCourses).post(actions.AddCourse);

router.route('/:id').patch(actions.EditCourse);

// router.route('/:id').delete(actions.DeleteCourse);
module.exports = router;