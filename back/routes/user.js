const express = require('express');
const router = express.Router();
const controller = require('../conrollers/users');



router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', controller.me);

module.exports = router;