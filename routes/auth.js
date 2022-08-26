const authRouter = require('express').Router();
const authController = require('../controllers/authController');
const { checkUser } = require('../validations/validators');

authRouter.post('/signup', checkUser, authController.signup);
authRouter.post('/login', checkUser, authController.login);

module.exports = authRouter;