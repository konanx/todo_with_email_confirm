import React, { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../contexts/Main";
import { useNavigate } from "react-router-dom";
function Rejestracja() {
  const navigate = useNavigate();
  const [socket] = useContext(SocketContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  useEffect(() => {
    if (socket) {
      socket.on("registerAttemptResponse", (email: string) => {
        console.log("ASADDSAADSADSADSADS");
        navigate(`/potwierdz/:${email}`);
      });
    }
  }, [socket]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h6">
          REJESTRACJA
        </Typography>
        <TextField
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{ inputMode: "email" }}
          required
        />
        <TextField
          id="outlined-basic"
          label="Haslo"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Powtórz haslo"
          variant="outlined"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <Button
          type="button"
          sx={{ mt: 1 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() =>
            socket.emit("registerAttempt", { login: email, password })
          }
        >
          Stwórz konto
        </Button>
      </Box>
    </Box>
  );
}

export default Rejestracja;
