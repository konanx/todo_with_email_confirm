import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { SocketContext } from "../../contexts/Main";
import { Socket } from "socket.io";
import { selectTodoListisLoading } from "../../../features/selected/selectedTodoList";
function ToDoList() {
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
        setTodoLista(lista);
        dispatch(selectTodoListisLoading(false));
      });
    }
  }, [socket]);

  if (!currentTodoList)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          p: 3,
          pt: 15,
          background: "darkgreen",
        }}
      >
        <Typography variant="h3">
          Wybierz lub utwórz nową liste aby wyświetlić szczegóły
        </Typography>
      </Box>
    );
  if (isLoading)
    return (
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          p: 3,
          pt: 15,
          textAlign: "center",
        }}
      >
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        <Typography variant="h6">Ładowanie...</Typography>
      </Container>
    );
  return <Box sx={{ width: "100%", height: "100vh", p: 3 }}>eqwwe</Box>;
}

export default ToDoList;
