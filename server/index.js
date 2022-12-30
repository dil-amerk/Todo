const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());
//Routes 

app.post('/todos', async (req,res) => {
    try {
        const { name } = req.body;
        const { description } = req.body;

        const newTodo = await pool.query("INSERT INTO todo (todo_name, todo_description) VALUES($1, $2) RETURNING *", [name, description]);

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});