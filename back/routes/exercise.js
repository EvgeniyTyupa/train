const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../conrollers/exercises');

router.use(passport.authenticate('jwt', {session: false}));


router.get('/:userId', controller.getExercises);
router.post('/:userId', controller.addExercise);
router.patch('/', controller.updateExercises);
router.delete('/:id', controller.deleteExercise);

module.exports = router;