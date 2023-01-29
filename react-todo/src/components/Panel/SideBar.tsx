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
import Sheet from "@mui/joy/Sheet";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodoList,
  selectTodoListisLoading,
} from "../../features/selected/selectedTodoList";
import type { RootState } from "../../app/store";
function SideBar() {
  const dispatch = useDispatch();
  const wybranaLista = useSelector(
    (state: RootState) => state.selectedTodoList.selected
  );
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
      socket.on("dodajNowaListeResponse", (data: any) => {
        let session: any = sessionStorage.getItem("auth");
        session = JSON.parse(session);
        socket.emit("pobierzListyToDo", session.id);
      });
    }
  }, [socket]);
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        maxHeight: "100vh",
        scrollbarColor: "#6b6b6b #2b2b2b",
        backgroundColor: "darkgrey",
      }}
    >
      <Box
        sx={{
          height: "95vh",
          backgroundColor: "grey.900",
          p: 1,
          pb: 4,
          paddingBottom: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
        }}
      >
        <Typography variant="caption">Twoje listy zadań:</Typography>
        {listyTodo.map((item: any, index) => (
          <Paper
            elevation={2}
            role="btn"
            sx={{
              backgroundColor: wybranaLista == item.id ? "#EFC050" : "grey.900",
              p: 1,
              cursor: "pointer",
              "&:hover": {
                background: wybranaLista != item.id && "#45B8AC",
              },
            }}
            key={item.id}
            onClick={() => {
              dispatch(selectTodoListisLoading(true));
              dispatch(selectTodoList(item.id));
              socket.emit("pobierzZadaniaToDo", item.id);
            }}
          >
            <Typography variant="subtitle2">{item.name}</Typography>
          </Paper>
        ))}
      </Box>
      <Box
        sx={{
          height: "5vh",
          width: "100%",
          textAlign: "end",
          pr: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <AddToDoListDialog />
      </Box>
    </Box>
  );
}

export default SideBar;
