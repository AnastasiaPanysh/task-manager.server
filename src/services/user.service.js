const { getUsersDB, getUserByIdDB, updateUsersDB, deleteUserDB } = require('../repository/user.repository')

async function getUsers() {
    const user = await getUsersDB()
    if (!user.length) throw new Error('not found')
    return user
}

async function getUserById(id) {
    const user = await getUserByIdDB(id)
    if (!user.length) throw new Error('not found')
    return user
}

async function updateUsers(id, name, surname, email, pwd, status) {
    const user = await updateUsersDB(id, name, surname, email, pwd, status)
    if (!user.length) throw new Error('not found')
    return user
}

async function deleteUser(id) {
    const user = await deleteUserDB(id)
    if (!user.length) throw new Error('not found')
    return user

}
module.exports = { getUsers, getUserById, updateUsers, deleteUser }