import React from "react";
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
function SideBar() {
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
      <Paper
        elevation={2}
        role="btn"
        sx={{ backgroundColor: "grey.900", p: 1 }}
      >
        <Typography variant="subtitle2">TEST</Typography>
      </Paper>
      <Paper
        elevation={2}
        role="btn"
        sx={{ backgroundColor: "grey.900", p: 1 }}
      >
        <Typography variant="subtitle2">TEST</Typography>
      </Paper>
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
