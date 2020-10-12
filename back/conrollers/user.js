let passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');
const User = require('../models/user');
const user = require('../models/user');


module.exports.register = async function(req, res){
    const candidate = await User.findOne({email: req.body.email});
    if(candidate){
        res.status(409).json({
            message: 'User already exist!'
        });
    }else{
        const user = new User({
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
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
                userId: candidate._id
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