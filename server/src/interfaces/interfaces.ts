interface iTask {
  id?: number;
  task?: string;
  user_id?: number;
}
interface iUser {
  id?: number;
  name?: string;
  surname?: string;
  pwd?: string;
  email?: string;
  status?: number;
}

export { iTask, iUser };
