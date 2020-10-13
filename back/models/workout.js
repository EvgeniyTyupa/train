const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}],
    dates: []
});

module.exports = mongoose.model('Workout', WorkoutSchema);