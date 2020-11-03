const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    exercises: [
        {exercise: {type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true}, repeats: 0, measurement: 0}
    ],
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Workout', WorkoutSchema);