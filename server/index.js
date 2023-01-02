const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Routes

app.post("/todos", async (req, res) => {
  try {
    const { name } = req.body;
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (todo_name, todo_description) VALUES($1, $2) RETURNING *",
      [name, description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const getTodos = await pool.query("SELECT * FROM todo");

    res.json(getTodos);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);

    res.json(getTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET todo_name = $1, todo_description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );

    res.json("Update was successful !!");
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);

    res.json("Delete was successful !!");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
