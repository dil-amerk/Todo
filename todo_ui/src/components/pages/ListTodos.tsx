import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
  // console.log(todos);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "auto", border: 2 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontStyle: "italic" }}>Todo</TableCell>
            <TableCell align="center" sx={{ fontStyle: "italic" }}>
              Description
            </TableCell>
            <TableCell align="center" sx={{ fontStyle: "italic" }}>
              Edit
            </TableCell>
            <TableCell align="center" sx={{ fontStyle: "italic" }}>
              Delete
            </TableCell>
            <TableCell align="center" sx={{ fontStyle: "italic" }}>
              Done
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo: any) => (
            <TableRow
              key={todo.todo_name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {todo.todo_name}
              </TableCell>
              <TableCell align="center">{todo.todo_description}</TableCell>
              <TableCell align="center">
                <UpdateTodo
                  todo_name={todo.todo_name}
                  todo_description={todo.todo_description}
                  todo_id={todo.id}
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  sx={{ border: 1, backgroundColor: "red", color: "black" }}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell align="center">
                <Checkbox />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTodos;
