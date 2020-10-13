let passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');
const User = require('../models/user');
require('dotenv').config();


function getRandomCode(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.register = async function(req, res){
    const candidate = await User.findOne({email: req.body.email});
    if(candidate){
        res.status(409).json({
            message: 'User already exist!'
        });
    }else{
        const user = new User({
            email: req.body.email,
            password: passwordHash.generate(req.body.password),
            verified: false,
            verification_code: getRandomCode(1000, 9999),
            image: null
        });
        try{
            await user.save();
            res.status(201).json({
                message: 'User '+ req.body.email + ' created.',
                user: user
            });
        } catch(e){
            errorHandler(res, e)
        }
        
    }
}

module.exports.login = async function(req, res){
    const candidate = await User.findOne({email: req.body.email});
    if(candidate){
        const passwordResult = passwordHash.verify(req.body.password, candidate.password);
        if(passwordResult){
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({
                token: token
            })
        }else{
            res.status(404).json({
                message: 'Wrong email or password!'
            });
        }
    }else{
        res.status(404).json({
            message: 'Wrong email or password!'
        });
    }
}

module.exports.me = async function(req, res){
    if (req.headers && req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1], decoded;
        try {
            decoded = jwt.verify(token, keys.jwt);
        }catch(e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.userId;
        const user = await User.findById(userId);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            verified: user.verified,
        });
    }else{
        return res.send(500);
    }
    
}


// module.exports.updateUser = async function(req, res){
//     const candidate = await User.findOne({email: req.body.email});
// }

