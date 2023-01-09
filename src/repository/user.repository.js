const { pool } = require('../DB');

async function getUsersDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users';
  const data = (await client.query(sql)).rows;
  return data;
}

async function getUserByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users WHERE id=$1';
  const data = (await client.query(sql, [id])).rows;
  return data;
}

async function updateUsersDB(id, name, surname, email, pwd, status) {
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
    console.log(error.message);
    return [];
  }
}

async function deleteUserDB(id) {
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
    console.log(error.message);
    return [];
  }
}

async function patchUsersDB(id, dataFromClient) {
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
    console.log(error.message);
    return [];
  }
}
module.exports = {
  getUsersDB,
  getUserByIdDB,
  updateUsersDB,
  deleteUserDB,
  patchUsersDB,
};
