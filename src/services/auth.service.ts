import bcrypt from 'bcrypt';
import { ExceptionType } from '../helper/exceptions.type';
import { createUserDB, getUserByEmailDB } from '../repository/auth.repository';

async function createUser(name: string, surname: string, email: string, pwd: string): Promise<void> {
  const foundUser = await getUserByEmailDB(email);
  if (foundUser.length) throw new Error(ExceptionType.REG_USER_SAME_LOGIN.message);
  const salt = await bcrypt.genSaltSync(10);
  const hashPwd = await bcrypt.hashSync(pwd, salt);
  await createUserDB(name, surname, email, hashPwd);
}

async function doAuthorization(email: string, pwd: string): Promise<void> {
  const foundUser = await getUserByEmailDB(email);
  if (!foundUser.length) throw new Error(ExceptionType.AUTH_USER_WITH_EMAIL.message);

  const userPwd = await getUserByEmailDB(email);
  if (!(await bcrypt.compare(pwd, userPwd[0].pwd))) throw new Error(ExceptionType.AUTH_USER_WITH_PWD.message);
}

export { createUser, doAuthorization };
