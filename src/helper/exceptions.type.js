const ExceptionType = {
    GET_USERS_NOT_FOUND: { id: 1, message: 'getUser: this user is not defind.' },
    GET_USER_NOT_FOUND: { id: 2, message: 'getUserById: this user is not defind.' },
    PUT_USER_NOT_FOUND: { id: 3, message: 'updateUsers: this user is not defind.' },
    DELETE_USER_NOT_FOUND: { id: 4, message: 'deleteUsers: this user is not defind.' },
    PATCH_USER_NOT_FOUND: { id: 5, message: 'patchUsers: this user is not defind.' },
}
module.exports = { ExceptionType }