const Workout = require('../models/workout');
const ObjectId = require('mongoose').Types.ObjectId;
const errorHandler = require('../utils/errorHandler');

module.exports.addWorkout = async function(req, res){
    const workout = new Workout({
        userId: req.body.userId,
        exercises: req.body.exercises,
        dates: req.body.dates
    });
    try{
        await workout.save();
        res.status(201).json({
            message: 'Workout created.',
            workout: workout
        });
    }catch(e){
        errorHandler(res ,e);
    }
}


module.exports.getWorkouts = async function(req, res){
    try{
        Workout.find({userId: new ObjectId(req.params.userId)})
        .then((workouts) => {
            if(workouts.length == 0){
                return res.status(404).json({
                    message: "No workouts."
                });
            }
            res.status(200).json({
                workouts: workouts
            });
        });
    }catch(e){
        errorHandler(res, e);
    }
}