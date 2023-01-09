const bcrypt = require('bcrypt');
const { ExceptionType } = require('../helper/exceptions.type');

const { createUserDB, getUserByEmailDB, checkUserByPwdDB } = require('../repository/auth.repository');

async function createUser(name, surname, email, pwd) {
  const foundUser = await getUserByEmailDB(email);
  if (foundUser.length) throw new Error(ExceptionType.REG_USER_SAME_LOGIN.message);
  const salt = await bcrypt.genSaltSync(10);
  const hashPwd = await bcrypt.hashSync(pwd, salt);
  await createUserDB(name, surname, email, hashPwd);
}

async function doAuthorization(email, pwd) {
  const foundUser = await getUserByEmailDB(email);
  if (!foundUser.length) throw new Error(ExceptionType.AUTH_USER_WITH_EMAIL.message);

  const userPwd = await checkUserByPwdDB(pwd, email);
  if (!(await bcrypt.compare(pwd, userPwd))) throw new Error(ExceptionType.AUTH_USER_WITH_PWD.message);
}

module.exports = { createUser, doAuthorization };
