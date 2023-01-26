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
import AddToDoListDialog from "./AddToDoListDialog";
function SideBar() {
  const [listyTodo, setListyTodo] = useState([]);
  const [socket] = useContext<any>(SocketContext);
  useEffect(() => {
    if (socket) {
      let session: any = sessionStorage.getItem("auth");
      session = JSON.parse(session);
      socket.emit("pobierzListyToDo", session.id);
      socket.on("pobierzListyToDoResponse", (listy: any) => {
        setListyTodo(listy);
        console.log(listy);
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
        paddingBottom: 1,
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
          key={index}
        >
          <Typography variant="subtitle2">{item.name}</Typography>
        </Paper>
      ))}
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box sx={{ display: "flex", ml: "auto" }}>
        <AddToDoListDialog />
      </Box>
    </Box>
  );
}

export default SideBar;
