import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

const AddTodo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const body = { name, description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setName("");
      setDescription("");
      <Alert severity="success">Todo was added :D </Alert>;
    } catch (error: any) {
      console.log(error.message);
    }
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
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button size="medium" type="submit">
          ADD
        </Button>
      </div>
    </Box>
  );
};

export default AddTodo;
