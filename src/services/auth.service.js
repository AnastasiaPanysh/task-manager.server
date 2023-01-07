const bcrypt = require('bcrypt')

const { createUserDB, getUserByEmailDB, checkUserByPwdDB } = require('../repository/auth.repository')

async function createUser(name, surname, email, pwd) {
    const foundUser = await getUserByEmailDB(email)
    if (foundUser.length) throw new Error('есть такой')
    const salt = await bcrypt.genSaltSync(10);
    const hashPwd = await bcrypt.hashSync(pwd, salt);
    await createUserDB(name, surname, email, hashPwd)
}

async function doAuthorization(email, pwd) {
    const foundUser = await getUserByEmailDB(email)
    if (!foundUser.length) throw new Error('нет такого email')

    const userPwd = await checkUserByPwdDB(pwd);
    if (!userPwd.length) throw new Error('некорректный пароль')

}

module.exports = { createUser, doAuthorization }