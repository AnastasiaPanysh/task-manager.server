const express = require('express')

const { createUser, doAuthorization } = require('../services/auth.service')
const { buildResponse } = require('../helper/buildResponse')
const { handleError } = require('../helper/handleError')
const route = express.Router()


route.post('/reg', async function (req, res) {
    try {
        const { name, surname, email, pwd } = req.body
        await createUser(name, surname, email, pwd)
        buildResponse(res, 200, 'success')
    } catch (error) {
        handleError(res, 404, error.message)
    }
})

route.post('/auth', async function (req, res) {
    try {
        const { email, pwd } = req.body
        await doAuthorization(email, pwd)
        buildResponse(res, 200, 'success')
    } catch (error) {
        handleError(res, 404, error.message)
    }
})



module.exports = route