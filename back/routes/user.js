const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../conrollers/users');



router.post('/register', controller.register);
router.post('/login', controller.login);
router.patch('/update/:userId', controller.update);
router.patch('/verify', controller.verify);
router.get('/me', passport.authenticate('jwt', {session: false}), controller.me);


module.exports = router;