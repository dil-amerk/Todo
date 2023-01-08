import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateTodo = ({todo_name, todo_description, todo_id}) => {
  const [name, setName] = useState(todo_name);
  const [description, setDescription] = useState(todo_description);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const body = { name, description };
    await axios
      .put(`http://localhost:5000/todos/${todo_id}`, {
        name: body.name,
        description: body.description,
      })
      .then((res) => console.log(res))
      .then((err) => console.error());
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Todo:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <Box component="form" onSubmit={handleOnSubmit}>
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  label={name}
                  multiline
                  maxRows={2}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="outlined-multiline-static"
                  label={description}
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
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateTodo;
