const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../conrollers/exercises');


router.get('/:userId', passport.authenticate('jwt', {session: false}), controller.getExercises);
router.post('/addex', passport.authenticate('jwt', {session: false}), controller.addExercise);
router.patch('/update/:id', passport.authenticate('jwt', {session: false}), controller.updateExercise);


module.exports = router;