import { getTasksDB, getTaskByIdDB, createTaskDB, updateTaskDB, deleteTaskDB, patchTaskDB } from '../repository/task.repository';
import { ExceptionType } from '../helper/exceptions.type';
import { iTask } from '../interfaces/interfaces';

async function getTasks(): Promise<iTask[]> {
  const dataTasks = await getTasksDB();
  if (!dataTasks.length) throw new Error(ExceptionType.GET_TASKS_NOT_FOUND.message);
  return dataTasks;
}

async function getTaskById(id: number): Promise<iTask[]> {
  const dataTask = await getTaskByIdDB(id);
  if (!dataTask.length) throw new Error(ExceptionType.GET_TASK_NOT_FOUND.message);
  return dataTask;
}

async function createTask(task: string, user_id: number): Promise<iTask[]> {
  const dataTask = await createTaskDB(task, user_id);
  if (!dataTask.length) throw new Error(ExceptionType.POST_TASK_NOT_FOUND.message);
  return dataTask;
}

async function updateTask(id: number, task: string, user_id: number): Promise<iTask[]> {
  const dataTask = await updateTaskDB(id, task, user_id);
  if (!dataTask.length) throw new Error(ExceptionType.PUT_TASK_FOUND.message);
  return dataTask;
}

async function deleteTask(id: number): Promise<iTask[]> {
  const dataTask = await deleteTaskDB(id);
  if (!dataTask.length) throw new Error(ExceptionType.DELETE_TASK_NOT_FOUND.message);
  return dataTask;
}

async function patchTask(id: number, dataClient: iTask): Promise<iTask[]> {
  const dataTask = await patchTaskDB(id, dataClient);
  if (!dataTask.length) throw new Error(ExceptionType.PATCH_TASK_NOT_FOUND.message);
  return dataTask;
}

export { getTasks, getTaskById, createTask, updateTask, deleteTask, patchTask };
