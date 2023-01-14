import React, { useRef, useContext, useEffect } from "react";
import { SocketContext } from "../contexts/Main";
import { Box, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
function RejestracjaConfirm() {
  const [socket] = useContext<any>(SocketContext);
  const id = useParams();
  useEffect(() => {
    if (socket) {
    }
  }, [socket]);
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" textAlign={"center"}>
          Wpisz kod otrzymany na emaila
        </Typography>
        <TextField
          onChange={(e) => {
            // USUWAMY SPACJE
            let code = e.target.value.trim();
            if (code.length > 5) {
              console.log("ldsa");
              socket.emit("registerAccountConfirm", {
                email: id.base64,
                code,
              });
            }
          }}
        />
      </Box>
    </Box>
  );
}

export default RejestracjaConfirm;
