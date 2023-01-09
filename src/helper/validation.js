const { ExceptionType } = require('../helper/exceptions.type');

function isValidUserId(req, res, next) {
  const { id } = req.params;
  if (!id) throw new Error(ExceptionType.USER_ID_INVALID.message);
  next();
}

function isValidUser(req, res, next) {
  const { name, surname } = req.body;

  if (!name) throw new Error(ExceptionType.USER_NAME_INVALID.message);
  if (!surname) throw new Error(ExceptionType.USER_SURNAME_INVALID.message);
  next();
}

function isValidEmail(req, res, next) {
  const { email } = req.body;
  if (!/^[0-9a-z\._-]+@[a-z]+\.[a-z]{1,3}$/g.test(email)) throw new Error(ExceptionType.USER_EMAIL_INVALID.message);
  next();
}

module.exports = { isValidUserId, isValidUser, isValidEmail };
