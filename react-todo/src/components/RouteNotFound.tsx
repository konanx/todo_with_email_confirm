import React from "react";
import { Box, Typography } from "@mui/material";
function RouteNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Typography variant="h4"> BŁĄD 404</Typography>
      <Typography variant="h2">Strona w trakcie budowy</Typography>
    </Box>
  );
}

export default RouteNotFound;
