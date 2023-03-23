import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";
import {
  Box,
  Container,
  Skeleton,
  Typography,
  Input,
  Button,
} from "@mui/material";
import { SocketContext } from "../../contexts/Main";
import { Socket } from "socket.io";
import { selectTodoListisLoading } from "../../../features/selected/selectedTodoListSlice";
import { TextField } from "@mui/joy";
import LoadingAnimation from "./Utility/LoadingAnimation";
import NoListSelected from "./Utility/NoListSelected";
import AddNewTask from "./AddNewTask";
import Task from "./Task/Task";

function ToDoContainer() {
  const dispatch = useDispatch();
  const [socket] = useContext<any>(SocketContext);
  const [todoLista, setTodoLista] = useState([]);
  const currentTodoList = useSelector(
    (state: RootState) => state.selectedTodoList.selected
  );
  const isLoading = useSelector(
    (state: RootState) => state.selectedTodoList.isLoading
  );

  useEffect(() => {
    if (socket) {
      socket.on("pobierzZadaniaToDoResponse", (lista: any) => {
        let sorted = lista.sort((a, b) => (a.id > b.id ? 1 : -1));
        setTodoLista(sorted);
        dispatch(selectTodoListisLoading(false));
      });
    }
  }, [socket]);

  if (!currentTodoList) return <NoListSelected />;
  if (isLoading) return <LoadingAnimation />;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "60%",
            overflow: "auto",
            "&::-webkit-scrollbar": { height: 10, WebkitAppearance: "none" },
          }}
        >
          {!todoLista.length ? (
            <Typography sx={{ mt: 3, textAlign: "center" }} variant="h5">
              Brak zadań do wykonania
            </Typography>
          ) : (
            todoLista.map((item: any, index: any) => {
              console.log(item);
              return <Task {...item} key={index} />;
            })
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <AddNewTask />
      </Box>
    </Box>
  );
}

export default ToDoContainer;
