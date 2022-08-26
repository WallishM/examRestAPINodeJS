const { checkSchema } = require("express-validator");

exports.checkProduct = checkSchema({
    name:{
        isLength:{
            errorMessage: 'Name should be at least 4 chars long',
            options: {min: 4}
        }
    },
    price:{
        isFloat:{
            errorMessage: 'Price should be a numeric greater than 0',
            options: {min: 0.01}
        }
    },
    brand:{
        isLength:{
            errorMessage: 'Name should be at least 3 chars long',
            options: {min: 3}
        }
    }
});

exports.checkUser = checkSchema({
    email:{
        isEmail:{
            errorMessage: 'Email should be like xxx@xxx.xxx',
        }
    },
    password:{
        isLength:{
            errorMessage: 'Password should be at least 4 chars long',
            options: {min: 4}
        }
    }
});