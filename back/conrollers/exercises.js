const Exercise = require('../models/exercise');
const ObjectId = require('mongoose').Types.ObjectId;
const errorHandler = require('../utils/errorHandler');


module.exports.addExercise = async function(req, res){
    const exercise = new Exercise({
        title: req.body.title,
        type_in: req.body.type_in,
        userId: req.body.userId
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
        Exercise.find({userId: new ObjectId(req.params.userId)})
        .then((exercises) => {
            if(exercises.length == 0){
                return res.status(404).json({
                    message: "No exercises."
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

module.exports.updateExercise = async function(req, res){
    try{
        const exercise = await Exercise.findById(req.params.id);
        Object.assign(exercise, req.body);
        exercise.save();
        res.status(201).json({
            exercise: exercise
        });
    }catch(e){
        res.status(404).send({
            message: "Exercise is not found!"
        });
    }
} 

module.exports.deleteExercise = async function(req, res){
    try{
        const exercise = await Exercise.findById(req.params.id);
        await exercise.remove();
        res.status(200).send({data: true});
    }catch(e){
        res.status(404).send({
            message: "Exercise is not found!"
        });
    }
}