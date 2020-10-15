const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true}],
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Workout', WorkoutSchema);