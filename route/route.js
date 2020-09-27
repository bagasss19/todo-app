const route = require('express').Router()
const Todo = require('../controller/todo')
const User = require('../controller/user')
const {checkLogin, pageLogin} = require('../middleware/login')

route.get('/', Todo.home)
route.post('/', User.login)
route.get('/register', User.register)
route.post('/register', User.add)
route.get('/logout', User.logout)


module.exports = route