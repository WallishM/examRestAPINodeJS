const {validationResult} = require('express-validator');

module.exports = req => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const error = new Error('Validation failed : ');
        validationErrors.errors.forEach(err => {
            error.message += '\n' + err.msg;
        });
        error.statusCode = 422;
        error.validation = validationErrors.array();
        throw error;
    }
};