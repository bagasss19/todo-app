const express = require('express')
const route = require('./route/route')
const app = express()
const port = process.env.PORT || 3000
const todo = require('./route/todo')
const session = require('express-session')

app.use(session({
  secret: 'BAGASGANTENGBANGET',
  resave: false,
  saveUninitialized: true
}))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended : true}))

app.use('/',route)
app.use('/todo',todo)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})