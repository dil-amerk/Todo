import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import React, {useState} from "react";
import PropTypes from "prop-types";
import UpdateTodo from "./pages/UpdateTodo";
import axios from "axios";


const TodoTable = () => {
    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id: any) => {
      const deleteTodo = await axios.delete(`http://localhost:5000/todos/${id}`);
  
      setTodos(todos.filter((todo) => todo.id !== id));
      console.log(deleteTodo);
    };
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Todo</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
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
                <TableCell align="right">{todo.todo_description}</TableCell>
                <TableCell align="right">
                  <UpdateTodo
                    todo_name={todo.todo_name}
                    todo_description={todo.todo_description}
                    todo_id={todo.id}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}


export default TodoTable;