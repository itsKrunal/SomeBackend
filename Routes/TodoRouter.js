const express = require('express');
const { addTodo, deleteTodo, updateTodo, getTodo } = require('../Controllers/TodoController');
const isAuth = require('../Middlewares/authMiddleware');
const TodoRouter = express.Router();


TodoRouter.route('/add-todo').post(isAuth, addTodo);
TodoRouter.route('/delete-todo').delete(isAuth,deleteTodo);
TodoRouter.route('/update-todo').post(isAuth, updateTodo)
TodoRouter.route('/get-todo').get(isAuth, getTodo)



module.exports =  {TodoRouter}