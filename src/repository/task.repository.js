const { pool } = require('../DB')

async function getTasksDB() {
    const client = await pool.connect()
    const sql = `SELECT * FROM tasks`
    const data = (await client.query(sql)).rows
    return data
}

async function getTaskByIdDB(id) {
    const client = await pool.connect()
    const sql = `SELECT * FROM tasks WHERE id=$1`
    const data = (await client.query(sql, [id])).rows
    return data
}

async function createTaskDB(task, user_id) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const sql = `INSERT INTO tasks (task,user_id)
        VALUES ($1,$2) RETURNING *`
        const data = (await client.query(sql, [task, user_id])).rows
        await client.query('COMMIT')
        return data
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(error.message);
        return []
    }
}

async function updateTaskDB(id, task, user_id) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const sql = `UPDATE tasks
        SET task=$1, user_id=$2 
        WHERE id=$3 RETURNING *`
        const data = (await client.query(sql, [task, user_id, id])).rows
        await client.query('COMMIT')
        return data
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(error.message);
        return []
    }
}

async function deleteTaskDB(id) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const sql = `DELETE FROM tasks WHERE id=$1 RETURNING *`
        const data = (await client.query(sql, [id])).rows
        await client.query('COMMIT')
        return data
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(error.message);
        return []
    }
}

async function patchTaskDB(id, dataClient) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const sql = `SELECT * FROM tasks WHERE id =$1`
        const data = (await client.query(sql, [id])).rows[0]

        const merge = {...data,...dataClient}

        const sql2 = `UPDATE tasks
        SET task=$1, user_id=$2 
        WHERE id=$3 RETURNING *`
        const data2 = (await client.query(sql2, [merge.task, merge.user_id, id])).rows

        await client.query('COMMIT')
        return data2
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(error.message);
        return []
    }
}

module.exports = { getTasksDB, getTaskByIdDB, createTaskDB, updateTaskDB, deleteTaskDB, patchTaskDB }