const express = require('express');
const { loginUser, registerUser, checkAuth } = require('../Controllers/UserController');
const isAuth = require('../Middlewares/authMiddleware');
const UserRouter = express.Router();


UserRouter.route('/login').post(loginUser);
UserRouter.route('/register').post(registerUser)
UserRouter.route('/checkAuth').get(isAuth, checkAuth)



module.exports =  {UserRouter}