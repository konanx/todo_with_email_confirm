import { Box, Typography } from "@mui/material";
import React from "react";

function NoListSelected() {
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
}

export default NoListSelected;
