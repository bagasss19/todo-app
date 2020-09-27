const route = require('express').Router()
const Controller = require('../controller/todo')
const checkLogin = require('../middleware/login')

route.get('/', checkLogin ,Controller.read)
route.get('/list', Controller.readTask)
route.get('/add', Controller.addForm)
route.post('/add', Controller.add)
route.get('/addPeople/:id', Controller.addPeopleForm)
route.post('/addPeople/:id', Controller.addPeople)
route.get('/edit/:id', Controller.editForm)
route.post('/edit/:id', Controller.edit)
route.get('/delete/:id', Controller.delete)
route.get('/done/:id', Controller.done)

module.exports = route