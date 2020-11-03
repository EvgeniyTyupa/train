const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    verification_code: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserSchema);