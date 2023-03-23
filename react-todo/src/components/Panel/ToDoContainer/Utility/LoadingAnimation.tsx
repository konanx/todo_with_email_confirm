import { Box, Typography, Skeleton } from "@mui/material";
import React from "react";

function LoadingAnimation() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          mt: 5,
          textAlign: "center",
        }}
      >
        <Box className="" sx={{ width: "60%" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Typography>Ładowanie...</Typography>
        </Box>
      </Box>
    </>
  );
}

export default LoadingAnimation;
