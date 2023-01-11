import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, IconButton, Grid, Divider } from "@mui/material";
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
  mx: 'auto',
};

const UpdateTodo = ({ todo_name, todo_description, todo_id }): JSX.Element => {
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
      <Button onClick={handleOpen} sx={{border: 1, backgroundColor: 'Highlight', color: 'black'}}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h1">
            Edit Todo:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <Grid component="form" onSubmit={handleOnSubmit} sx={{mx: 15}}>
              <TextField
                id="outlined-multiline-flexible"
                margin="dense"
                label={name}
                multiline
                maxRows={2}
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                id="outlined-multiline-flexible"
                margin="dense"
                label={description}
                multiline
                rows={3}
                variant="filled"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <IconButton
                color="success"
                aria-label="add"
                type="submit"
                edge="end"
              >
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateTodo;
