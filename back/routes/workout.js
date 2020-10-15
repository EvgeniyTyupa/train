const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../conrollers/workouts');

router.use(passport.authenticate('jwt', {session: false}));

router.get('/:userId', controller.getWorkouts);
router.post('/:userId', controller.addWorkout);
router.patch('/:id', controller.updateWorkout);
router.delete('/:id', controller.deleteWorkout);

module.exports = router;