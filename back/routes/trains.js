const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log("TRAIN ROUTE WORK");
});

module.exports = router;