const router = require('express').Router();
const actions = require('../controllers/teacher.controller');

router.route('/').get(actions.ViewTeachers).post(actions.AddTeacher).patch(actions.EditTeacher);

// router.route('/:id').delete(actions.DeleteCourse);
module.exports = router;