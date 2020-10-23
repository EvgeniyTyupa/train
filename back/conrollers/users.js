let passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user');
const Exercise = require('../models/exercise');
const Workout = require('../models/workout');

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
        let activationLink = `http://localhost:3000/verify?email=${user.email}`;
        try{
            await user.save();
            res.status(201).json({
                message: 'Success! To complete registration, you need to activate your account. We send activation code to your email with activation link. (Now in browser console. Press f12)',
                link: activationLink,
                code: user.verification_code
            });
        } catch(e){
            errorHandler(res, e)
        }
        
    }
}

module.exports.login = async function(req, res){
    try{
        const candidate = await User.findOne({email: req.body.email});
        if(candidate){
            const passwordResult = passwordHash.verify(req.body.password, candidate.password);
            if(passwordResult){
                const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate._id,
                }, keys.jwt, {expiresIn: 60 * 60});
                if(candidate.verified){
                    res.status(200).json({
                        token: token
                    })
                }else{
                    res.status(403).json({
                        message: 'You need to activate your account!'
                    });
                }
                
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
    }catch(e){
        errorHandler(res, e);
    }
    
}

module.exports.me = async function(req, res){
    try{
        if (req.headers && req.headers.authorization) {
            let decoded;
            let token = req.headers.authorization.split(' ')[1];
            try {
                decoded = jwt.verify(token, keys.jwt);
            }catch(e) {
                return res.status(401).send({message: 'Unauthorized.'});
            }
            var userId = decoded.userId;
            const user = await User.findById(userId);
            const exercises = await Exercise.find({userId: new ObjectId(userId)});
            const workouts = await Workout.find({userId: new ObjectId(userId)});
    
            res.status(200).json({
                _id: user._id,
                email: user.email,
                verified: user.verified,
                image: user.image,
                exercises: exercises,
                workouts: workouts
            });
        }else{
            return res.send(500);
        }
    }catch(e){
        errorHandler(res, e);
    }
    
    
}

module.exports.update = async function(req, res){
    try{
        const user = await User.findById(req.params.userId);
        Object.assign(user, req.body);
        user.save();
        res.status(201).json({
            user: user,
        });
    }catch(e){
        errorHandler(res, e);
    }
}

module.exports.verify = async function(req, res){
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) res.status(404).json({
            message: 'User not found!'
        });
        if(!user.verified){
            if(user.verification_code == req.body.verification_code){
                await user.updateOne({verified: true});
                
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id,
                }, keys.jwt, {expiresIn: 60 * 60});
                console.log("verify:" + token);
                res.status(201).json({
                    message: 'Account activated!',
                    token: token
                });
            }else{
                res.status(403).json({
                    message: 'Invalid verification code!'
                });
            }
        }else{
            res.status(400).json({
                message: 'Account already activated!'
            });
        }
    }catch(e){
        errorHandler(res, e);
    }
}

