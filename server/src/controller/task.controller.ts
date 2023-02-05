import express, { Request, Response } from 'express';
import { buildResponse } from '../helper/buildResponse';
import { handleError } from '../helper/handleError';
import { getTasks, getTaskById, createTask, updateTask, deleteTask, patchTask } from '../services/task.service';

const route = express.Router();

route.get('/', async function (req: Request, res: Response) {
  try {
    const dataTasks = await getTasks();
    buildResponse(res, 200, dataTasks);
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.get('/:id', async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const dataTask = await getTaskById(id);
    buildResponse(res, 200, dataTask);
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.post('/', async function (req: Request, res: Response) {
  try {
    const { task, user_id } = req.body;
    const dataTask = await createTask(task, user_id);
    buildResponse(res, 200, dataTask);
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.put('/:id', async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { task, user_id } = req.body;
    const dataTask = await updateTask(id, task, user_id);
    buildResponse(res, 200, dataTask);
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.delete('/:id', async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const dataTask = await deleteTask(id);
    buildResponse(res, 200, dataTask);
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.patch('/:id', async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const dataTask = await patchTask(id, req.body);
    buildResponse(res, 200, dataTask);
  } catch (error) {
    handleError(res, 404, error);
  }
});

export default route;
