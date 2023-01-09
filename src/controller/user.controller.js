const express = require('express');
const { getUsers, getUserById, updateUsers, deleteUser, patchUsers } = require('../services/user.service');
const { buildResponse } = require('../helper/buildResponse');
const { handleError } = require('../helper/handleError');
const { isValidUserId, isValidUser } = require('../helper/validation');

const route = express.Router();

route.get('/', async function (req, res) {
  try {
    const user = await getUsers();
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error.message);
  }
});

route.get('/:id', isValidUserId, async function (req, res) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error.message);
  }
});

route.put('/:id', isValidUserId, isValidUser, async function (req, res) {
  try {
    const { id } = req.params;
    const { name, surname, email, pwd, status } = req.body;
    const user = await updateUsers(id, name, surname, email, pwd, status);
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error.message);
  }
});

route.delete('/:id', isValidUserId, async function (req, res) {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error.message);
  }
});

route.patch('/:id', isValidUserId, async function (req, res) {
  try {
    const { id } = req.params;
    const user = await patchUsers(id, req.body);
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error.message);
  }
});

module.exports = route;
