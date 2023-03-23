import { Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import EditIcon from "@mui/icons-material/Edit";
function Task(item: any) {
  console.log(item);
  return (
    <Box sx={{ mt: 1.2 }}>
      <Paper elevation={3} sx={{ p: 1.5, px: 1.5 }}>
        <Grid2 container sx={{ alignItems: "center" }}>
          <Grid2 xs={10}>
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              {item.name}
            </Typography>
          </Grid2>
          <Grid2 xs={2}>
            <IconButton aria-label="delete">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Grid2>
        </Grid2>
      </Paper>
    </Box>
  );
}

export default Task;
