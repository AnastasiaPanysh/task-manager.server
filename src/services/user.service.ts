import { getUsersDB, getUserByIdDB, updateUsersDB, deleteUserDB, patchUsersDB } from '../repository/user.repository';
import { ExceptionType } from '../helper/exceptions.type';
import { iUser } from '../interfaces/interfaces';

async function getUsers(): Promise<iUser[]> {
  const user = await getUsersDB();
  if (!user.length) throw new Error(ExceptionType.GET_USERS_NOT_FOUND.message);
  return user;
}

async function getUserById(id: number): Promise<iUser[]> {
  const user = await getUserByIdDB(id);
  if (!user.length) throw new Error(ExceptionType.GET_USER_NOT_FOUND.message);
  return user;
}

async function updateUsers(id: number, name: string, surname: string, email: string, pwd: string, status: number): Promise<iUser[]> {
  const user = await updateUsersDB(id, name, surname, email, pwd, status);
  if (!user.length) throw new Error(ExceptionType.PUT_USER_NOT_FOUND.message);
  return user;
}

async function deleteUser(id: number): Promise<iUser[]> {
  const user = await deleteUserDB(id);
  if (!user.length) throw new Error(ExceptionType.DELETE_USER_NOT_FOUND.message);
  return user;
}

async function patchUsers(id: number, dataFromClient: iUser): Promise<iUser[]> {
  const user = await patchUsersDB(id, dataFromClient);
  if (!user.length) throw new Error(ExceptionType.PATCH_USER_NOT_FOUND.message);
  return user;
}
export { getUsers, getUserById, updateUsers, deleteUser, patchUsers };
