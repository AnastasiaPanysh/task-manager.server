const { getUsersDB, getUserByIdDB, updateUsersDB, deleteUserDB, patchUsersDB } = require('../repository/user.repository')
const { ExceptionType } = require('../helper/exceptions.type')

async function getUsers() {
    const user = await getUsersDB()
    if (!user.length) throw new Error(ExceptionType.GET_USERS_NOT_FOUND.message)
    return user
}

async function getUserById(id) {
    const user = await getUserByIdDB(id)
    if (!user.length) throw new Error(ExceptionType.GET_USER_NOT_FOUND.message)
    return user
}

async function updateUsers(id, name, surname, email, pwd, status) {
    const user = await updateUsersDB(id, name, surname, email, pwd, status)
    if (!user.length) throw new Error(ExceptionType.PUT_USER_NOT_FOUND.message)
    return user
}

async function deleteUser(id) {
    const user = await deleteUserDB(id)
    if (!user.length) throw new Error(ExceptionType.DELETE_USER_NOT_FOUND.message)
    return user
}

async function patchUsers(id, dataFromClient) {
    const user = await patchUsersDB(id, dataFromClient)
    if (!user.length) throw new Error(ExceptionType.PATCH_USER_NOT_FOUND.message)
    return user
}
module.exports = { getUsers, getUserById, updateUsers, deleteUser, patchUsers }