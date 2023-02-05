import express, { Request, Response } from 'express';
import { getUsers, getUserById, updateUsers, deleteUser, patchUsers } from '../services/user.service';
import { buildResponse } from '../helper/buildResponse';
import { handleError } from '../helper/handleError';
import { isValidUserId, isValidUser, isValidEmail } from '../helper/validation';

const route = express.Router();

route.get('/', async function (req: Request, res: Response) {
  try {
    const user = await getUsers();
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.get('/:id', isValidUserId, async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.put('/:id', isValidUserId, isValidUser, isValidEmail, async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, surname, email, pwd, status } = req.body;
    const user = await updateUsers(id, name, surname, email, pwd, status);
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.delete('/:id', isValidUserId, async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.patch('/:id', isValidUserId, async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await patchUsers(id, req.body);
    buildResponse(res, 200, user);
  } catch (error) {
    handleError(res, 404, error);
  }
});

export default route;
