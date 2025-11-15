
const {Pool} = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
})

pool.connect((err,client, release) =>{
if(err){
    console.log("ERROR: ", err.message);
    return;
}
    console.log("Connection established");
    release();
});

// UPORABNIKI

//PRIDOBI VSE UPORABNIKE
async function getUsers() {
const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
return result.rows;
}

//PRIDOBI VSE UPORABNIKE BY EMAIL
async function getUserByEmail(email) {
const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
return result.rows[0]
}

//PRIDOBI VSE UPORABNIKE BY EMAIL
async function getUserById(id) {
const result = await pool.query("SELECT * FROM users WHERE id= $1", [id])
return result.rows[0]
}

//USTVARI NOVEGA UPORABNIKA
async function createUser(username, email, password) {
    const results = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, password]);
    return results.rows[0];
}

//PRIDOBI VSE NALOGE
async function getTask() {
    const results = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    return results.rows;
    }

//USTVARI NOVO NALOGO
async function createTask(title, description, due_date, priority, status) {
    const results = await pool.query("INSERT INTO tasks (title, description, due_date, priority, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, description, due_date, priority, status] 
    );
    return results.rows[0];
}

//IZBRIŠI TASK
async function deleteTask(id){
    const results = await pool.query("DELETE FROM tasks WHERE id=$1 RETURNING *", [id]);
    return results.rows[0];
}

//PRIDOBI LISTE
async function getLists() {
    const results = await pool.query("SELECT * FROM lists ORDER BY id ASC");
    return results.rows;
}

//DODAJ NOVO LISTO
async function createList(title) {
    const results = await pool.query("INSERT INTO lists (title) VALUES ($1) RETURNING *", [title]);
    return results.rows[0];
}

//IZBRIŠI LISTO
async function deleteList(id) {
    const results = await pool.query("DELETE FROM lists WHERE id = $1 RETURNING *", [id]);
    return results.rows[0];
}
module.exports={
    pool,
    getLists,
    getTask,
    getUserByEmail,
    getUsers,
    createList,
    createTask,
    createUser,
    deleteList,
    deleteTask
};