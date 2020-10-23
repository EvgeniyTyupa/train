const Workout = require('../models/workout');
const ObjectId = require('mongoose').Types.ObjectId;
const errorHandler = require('../utils/errorHandler');

module.exports.addWorkout = async function(req, res){
    const workout = new Workout({
        userId: req.params.userId,
        exercises: req.body.exercises,
        date: req.body.date
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
                    message: "No workouts.",
                    workouts: []
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

module.exports.updateWorkout = async function(req, res){
    try{
        const workout = await Workout.findById(req.params.id);
        if(!workout) res.status(404).json({
            message: 'Workout not found!'
        });
        Object.assign(workout, req.body);
        workout.save();
        res.status(201).json({
            workout: workout
        });
    }catch(e){
        console.log(e);
        errorHandler(res, e);
    }
}

module.exports.deleteWorkout = async function(req, res){
    try{
        const workout = await Workout.findById(req.param.id);
        if(!workout) res.status(404).json({
            message: 'Workout not found!'
        });
        await workout.remove();
        res.status(200).send({message: 'Success!'});
    }catch(e){
        errorHandler(res, e);
    }
}