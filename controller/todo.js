const { Todo, User, TodoUser } = require("../models")
const dateFormat = require('../helper/dateFormat')
const now = require('../helper/now')
class Controller {
    static home (req,res) {
        const msg = req.session.msg || null
        let status = req.session.login || false
        delete req.session.msg
        res.render('home', {msg, status})
    }

    static read (req, res) {
        let status = req.session.login || false
        User.findAll({
            where : {
                id : req.session.userId
            },
            include : [Todo]
        })
        .then(data => {
                res.render('todo', {data , dateFormat, status})    
        })
        .catch(err => res.send(`${err}`))
    }

    static addForm(req,res) {
        User.findAll()
        .then(data => {
            //res.send(data)
            res.render('add-todo', {data , dateFormat})
        })
        .catch(err => res.send(`${err}`))
    }

    static add (req,res) {
        let obj = req.body
        obj.user_id = req.session.userId
        
         Todo.create(obj)
         .then( data => {
            res.redirect('/todo')
        }) 
        .catch(err => res.send(err))
    }

    static editForm (req,res) {
        Todo.findAll({
            where : {
                id : req.params.id,
            }
        })
        .then(data => res.render('edit-todo', {data}))
        .catch(err => res.send(`${err}`))
    }

    static edit (req,res) {
        let obj = req.body
        obj.isCompleted = false
        obj.completedAt = null
        console.log(obj);
        Todo.update(obj, {
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            console.log(data);
            res.redirect('/todo')
            
        })
        .catch(err => res.send(err))
    }

    static delete(req,res) {
        const prom1 = TodoUser.destroy({
            where : {
                todo_id : req.params.id
            }
        })

        const prom2 = Todo.destroy({
            where : {
                id : req.params.id
            }
        })
        Promise.all([prom1,prom2])
        .then(data => res.redirect('/todo'))
        .catch(err => res.send(`${err}`))
    }

    static addPeopleForm(req,res) {
        let prom1 = Todo.findAll({
            where : {
                id : req.params.id
            }
        })

        let prom2 = User.findAll()

        let prom3 = TodoUser.findAll({
            where : {
                todo_id : req.params.id
            },
            include : [User, Todo]
            }
        )

        Promise.all([prom1,prom2,prom3])
        .then(data => {
            let todo = data[0]
            let user = data[1]
            let tc = data[2]
            res.render('add-people', {todo, user, tc}) 
        })
        .catch(err => res.send(`${err}`))
    }

    static addPeople(req,res) {
        TodoUser.create(req.body)
        .then(data => res.redirect(`/todo/addPeople/${req.params.id}`))
        .catch(err => res.send(err))
    }

    static readTask(req,res) {
        TodoUser.findAll({
            where : {
                user_id : req.session.userId
            },
            include : [User, Todo]
            }
        )
        .then(data => res.render('tasklist', {data, dateFormat}))
        .catch(err => res.send(err))
    }

    static done(req,res) {
        Todo.update(
            { isCompleted: true , completedAt: now },
            { where: { id: req.params.id } })
        .then(data => res.redirect('/todo'))
        .catch(err => res.send(err))
    }
}

module.exports = Controller