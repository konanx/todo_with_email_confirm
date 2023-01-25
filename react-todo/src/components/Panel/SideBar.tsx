import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { SocketContext } from "../contexts/Main";
function SideBar() {
  const [listyTodo, setListyTodo] = useState([]);
  const [socket] = useContext(SocketContext);
  useEffect(() => {
    if (socket) {
      socket.emit("pobierzListyTodo");
      socket.on("pobierzListyTodoResponse", (listy: any) => {
        setListyTodo(listy);
      });
    }
  }, [socket]);
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "grey.900",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {listyTodo.map((item, index) => (
        <Paper
          elevation={2}
          role="btn"
          sx={{ backgroundColor: "grey.900", p: 1 }}
        >
          <Typography variant="subtitle2">TEST</Typography>
        </Paper>
      ))}
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box sx={{ display: "flex" }}>
        <TextField label="Dodaj nową tablicę" size="small" />
        <IconButton aria-label="delete">
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SideBar;
