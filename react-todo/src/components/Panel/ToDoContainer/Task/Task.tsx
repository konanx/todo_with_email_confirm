import { Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Priority from "./Priority";
function Task(item: any) {
  console.log(item);
  return (
    <Box sx={{ mt: 1.2 }}>
      <Paper elevation={3} sx={{ p: 1.5, px: 1.5 }}>
        <Grid2 container sx={{ alignItems: "center" }}>
          <Grid2 xs={7}>
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              {item.name}
            </Typography>
          </Grid2>
          <Grid2 xs={2}>
            <Priority />
          </Grid2>
          <Grid2 xs={2} sx={{ display: "flex", justifyContent: "end", px: 1 }}>
            <IconButton aria-label="delete">
              <EditIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon sx={{ color: "red", fontSize: 18 }} />
            </IconButton>
          </Grid2>
          <Grid2 xs={1} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton aria-label="delete">
              <StarBorderIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      </Paper>
    </Box>
  );
}

export default Task;
