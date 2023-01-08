import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import axios from "axios";
import { IconButton, Input, Paper } from "@mui/material";
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
    <Box sx={{ width: 300, mx: "auto", mb: 10 }}>
      <Box component="form" onSubmit={handleOnSubmit}>
        <Box sx={{ display: "inline-flex" }}>
          <TextField
            sx={{ justifyContent: "center" }}
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            sx={{ justifyContent: "center" }}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <IconButton color="success" aria-label="add" type="submit">
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTodo;
