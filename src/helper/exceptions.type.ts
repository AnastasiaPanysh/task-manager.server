const ExceptionType = {
  GET_USERS_NOT_FOUND: { id: 1, message: 'getUser: this user is not defind.' },
  GET_USER_NOT_FOUND: {
    id: 2,
    message: 'getUserById: this user is not defind.',
  },
  PUT_USER_NOT_FOUND: {
    id: 3,
    message: 'updateUsers: this user is not defind.',
  },
  DELETE_USER_NOT_FOUND: {
    id: 4,
    message: 'deleteUsers: this user is not defind.',
  },
  PATCH_USER_NOT_FOUND: {
    id: 5,
    message: 'patchUsers: this user is not defind.',
  },
  USER_ID_INVALID: {
    id: 6,
    message: 'isValidUserId: this ID is invalid for this user',
  },
  USER_NAME_INVALID: {
    id: 7,
    message: 'isValidUser: this NAME is invalid for this user',
  },
  USER_SURNAME_INVALID: {
    id: 8,
    message: 'isValidUser: this SURNAME is invalid for this user',
  },
  USER_EMAIL_INVALID: {
    id: 9,
    message: 'isValidUser: this EMAIL is invalid for this user',
  },

  GET_TASKS_NOT_FOUND: {
    id: 10,
    message: 'getTasks: this tasks are not defind.',
  },
  GET_TASK_NOT_FOUND: {
    id: 11,
    message: 'getTaskById: this task is not defind.',
  },
  POST_TASK_NOT_FOUND: {
    id: 11,
    message: 'createTask: this task is not defind.',
  },
  PUT_TASK_FOUND: { id: 12, message: 'updateTasks: this task is not defind.' },
  DELETE_TASK_NOT_FOUND: {
    id: 13,
    message: 'deleteTasks: this task is not defind.',
  },
  PATCH_TASK_NOT_FOUND: {
    id: 14,
    message: 'patchTasks: this task is not defind.',
  },

  REG_USER_SAME_LOGIN: {
    id: 15,
    message: 'createUser: there is already a user with this password.',
  },
  AUTH_USER_WITH_EMAIL: {
    id: 16,
    message: 'getUserByEmailDB: user with this email does not exist.',
  },
  AUTH_USER_WITH_PWD: { id: 17, message: 'checkUserByPwdDB: wrong password.' },
};

export { ExceptionType };
