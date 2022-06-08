const router = require('express').Router();
const actions = require('../controllers/user.controller');
router.route('/').patch(actions.setActive)

module.exports = router;