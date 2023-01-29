import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { Box, Typography } from "@mui/material";
function ToDoList() {
  const currentTodoList = useSelector(
    (state: RootState) => state.selectedTodoList.selected
  );
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
  return <Box></Box>;
}

export default ToDoList;
