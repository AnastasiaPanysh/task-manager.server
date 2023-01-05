const { createUserDB, getUserByEmailDB, checkUserByPwdDB } = require('../repository/auth.repository')

async function createUser(name, surname, email, pwd) {
    const foundUser = await getUserByEmailDB(email)
    if (foundUser.length) throw new Error('есть такой')
    await createUserDB(name, surname, email, pwd)
}

async function doAuthorization(email, pwd) {
    const foundUser = await getUserByEmailDB(email)
    if (!foundUser.length) throw new Error('нет такого email')

    const user = await checkUserByPwdDB(pwd);
    if (!user.length) throw new Error('некорректный пароль')

}

module.exports = { createUser, doAuthorization }