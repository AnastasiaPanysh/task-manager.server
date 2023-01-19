import { pool } from '../DB';
import { iUser } from '../interfaces/interfaces';

async function getUsersDB(): Promise<iUser[]> {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users';
  const data = (await client.query(sql)).rows;
  return data;
}

async function getUserByIdDB(id: number): Promise<iUser[]> {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users WHERE id=$1';
  const data = (await client.query(sql, [id])).rows;
  return data;
}

async function updateUsersDB(id: number, name: string, surname: string, email: string, pwd: string, status: number): Promise<iUser[]> {
  const client = await pool.connect();
  try {
    client.query('BEGIN');
    const sql = `UPDATE users 
        SET name=$1, surname=$2, pwd=$3, email=$4, status=$5
        WHERE id=$6
        RETURNING *`;
    const data = (await client.query(sql, [name, surname, email, pwd, status, id])).rows;
    client.query('COMMIT');
    return data;
  } catch (error) {
    client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function deleteUserDB(id: number): Promise<iUser[]> {
  const client = await pool.connect();
  try {
    client.query('BEGIN');
    const sql = `UPDATE users SET status=1 WHERE id=$1 
        RETURNING * `;
    const data = (await client.query(sql, [id])).rows;
    client.query('COMMIT');
    return data;
  } catch (error) {
    client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function patchUsersDB(id: number, dataFromClient: iUser): Promise<iUser[]> {
  const client = await pool.connect();
  try {
    client.query('BEGIN');
    const sql = `SELECT * FROM users WHERE id=$1`;
    const data = (await client.query(sql, [id])).rows[0];
    const merged = { ...data, ...dataFromClient };
    const sql2 = `UPDATE users 
        SET name=$1, surname=$2, pwd=$3, email=$4, status=$5
        WHERE id=$6
        RETURNING *`;
    const patchData = (await client.query(sql2, [merged.name, merged.surname, merged.email, merged.pwd, merged.status, id])).rows;
    client.query('COMMIT');
    return patchData;
  } catch (error) {
    client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}
export { getUsersDB, getUserByIdDB, updateUsersDB, deleteUserDB, patchUsersDB };
