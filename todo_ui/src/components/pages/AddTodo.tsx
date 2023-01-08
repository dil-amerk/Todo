import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddTodo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const body = { name, description };
    await axios
      .post("http://localhost:5000/todos", {
        name: body.name,
        description: body.description,
      })
      .then((res) => console.log(res))
      .then((err) => console.error());
    setName("");
    setDescription("");
  };

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Todo Name"
          multiline
          maxRows={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="outlined-multiline-static"
          label="Description of the todo"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <IconButton color="primary" aria-label="add" type="submit">
          <AddCircleIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default AddTodo;
