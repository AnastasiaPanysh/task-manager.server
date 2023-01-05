const express = require('express')
const user = require('./controller/user.controller')
const task = require('./controller/task.controller')
const auth = require('./controller/auth.controller')
const bodyParser = require('body-parser')
const app = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})
app.use(bodyParser.json())  

app.use('/user', user)
app.use('/task', task)
app.use('/api', auth)

app.use(function (error, req, res, next) {
    res.status(500).send(error.message)
})

module.exports = app