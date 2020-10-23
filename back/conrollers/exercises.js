const Exercise = require('../models/exercise');
const Workout = require('../models/workout');
const ObjectId = require('mongoose').Types.ObjectId;
const errorHandler = require('../utils/errorHandler');


module.exports.addExercise = async function(req, res){
    const exercise = new Exercise({
        title: req.body.title,
        measurement: req.body.measurement,
        userId: req.params.userId
    });
    try{
        await exercise.save();
        res.status(201).json({
            message: 'Exercise created.',
            exercise: exercise
        });
    }catch(e){
        errorHandler(res, e);
    }
}

module.exports.getExercises = async function(req, res){
    try{
        await Exercise.find({userId: new ObjectId(req.params.userId)})
        .then((exercises) => {
            if(exercises.length === 0){
                return res.status(404).json({
                    message: "No exercises.",
                    exercises: []
                })
            }
            res.status(200).json({
                exercises: exercises
            })
        });
    }catch(e){
        errorHandler(res, e);
    }
}

module.exports.updateExercises = async function(req, res){
    try{
        let exercises = req.body.exercises;
            for await (let ex of exercises) {
                await Exercise.findById(ex._id).updateOne({title: ex.title, measurement: ex.measurement});
            }
        res.status(202).json({
            message: 'Updated!',
            exercises: exercises
        });      
    }catch(e){
        errorHandler(res, e);
    }
} 

module.exports.deleteExercise = async function(req, res){
    try{
        const exercise = await Exercise.findById(req.params.id);
        if(!exercise) res.status(404).send({
            message: "Exercise is not found!"
        });

        const workouts = await Workout.find({userId: new ObjectId(exercise.userId)});
        for await (let workout of workouts) {
            for await (let ex of workout.exercises){
                if(ex.exercise == req.params.id){
                    let index = workout.exercises.indexOf(ex);
                    workout.exercises.splice(index, 1);
                    workout.save();
                }
            }
        }
        
        await exercise.remove();
        
        res.status(200).send({message: 'Success!'});
    }catch(e){
        errorHandler(res, e);
    }
}

