const {
  getTasksDB,
  getTaskByIdDB,
  createTaskDB,
  updateTaskDB,
  deleteTaskDB,
  patchTaskDB,
} = require('../repository/task.repository');
const { ExceptionType } = require('../helper/exceptions.type');

async function getTasks() {
  const dataTasks = await getTasksDB();
  if (!dataTasks.length)
    throw new Error(ExceptionType.GET_TASKS_NOT_FOUND.message);
  return dataTasks;
}

async function getTaskById(id) {
  const dataTask = await getTaskByIdDB(id);
  if (!dataTask.length)
    throw new Error(ExceptionType.GET_TASK_NOT_FOUND.message);
  return dataTask;
}

async function createTask(task, user_id) {
  const dataTask = await createTaskDB(task, user_id);
  if (!dataTask.length)
    throw new Error(ExceptionType.POST_TASK_NOT_FOUND.message);
  return dataTask;
}

async function updateTask(id, task, user_id) {
  const dataTask = await updateTaskDB(id, task, user_id);
  if (!dataTask.length) throw new Error(ExceptionType.PUT_TASK_FOUND.message);
  return dataTask;
}

async function deleteTask(id) {
  const dataTask = await deleteTaskDB(id);
  if (!dataTask.length)
    throw new Error(ExceptionType.DELETE_TASK_NOT_FOUND.message);
  return dataTask;
}

async function patchTask(id, dataClient) {
  const dataTask = await patchTaskDB(id, dataClient);
  if (!dataTask.length)
    throw new Error(ExceptionType.PATCH_TASK_NOT_FOUND.message);
  return dataTask;
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  patchTask,
};
