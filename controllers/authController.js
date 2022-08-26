const User = require('../models/user');
const validationHandler = require('../validations/validationHandler');
const config = require('../config/index');
const jwt = require ('jwt-simple');

exports.signup = async (req, res, next) => {
    try {
        validationHandler(req);

        let existingUser = await User.findOne({email: req.body.email});
    
        if(existingUser){
            let error = new Error('Email already used. Please login or change email');
            error.statusCode = 403;
            throw error.message;
        }
    
        let user = new User();
    
        user.email = req.body.email;
        user.password = await user.encryptPassword(req.body.password);
        user = await user.save();
    
        let token = jwt.encode({id: user.id}, config.jwtSecret);
    
        res.json({user, token});       
    } catch (err) {
        next(err);
    }


};

exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({email: req.body.email}).select('+password');

        if(!user){
            let err = new Error('Wrong credentials');
            err.statusCode = 401;
            throw err;
        }

        let validPassword = await user.validPassword(req.body.password, user.password);

        if(!validPassword){
            let err = new Error('Wrong credentials');
            err.statusCode = 401;
            throw err;
        }

        let token = jwt.encode({id: user.id}, config.jwtSecret);

        res.json({user, token});

    } catch (err) {
        next(err);
    }
}
