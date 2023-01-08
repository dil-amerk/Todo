import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Divider, Paper, ToggleButton } from "@mui/material";
import UpdateTodo from "./UpdateTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id: any) => {
    const deleteTodo = await axios.delete(`http://localhost:5000/todos/${id}`);

    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(deleteTodo);
  };

  const getTodos = async () => {
    await axios
      .get("http://localhost:5000/todos")
      .then((res) => res.data.rows)
      .then((todos) => setTodos(todos))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTodos();
  }, [getTodos()]);

  if (!todos) {
    return null;
  }
  console.log(todos);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap-reverse",
        "& > :not(style)": {
          m: 1,
          width: "auto",
          height: "auto",
        },
      }}
    >
      {todos.map((todo: any) => (
        <Paper elevation={8} key={todo.id}>
          {todo.todo_name}
          <Divider color="black" />
          {todo.todo_description}
          <Divider color="black" />
          <Box>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <UpdateTodo
              todo_name={todo.todo_name}
              todo_description={todo.todo_description}
              todo_id={todo.id}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ListTodos;
