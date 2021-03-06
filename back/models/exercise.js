const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    measurement: {
        type: String,
        required: true
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Exercise', ExerciseSchema);