import React, { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../contexts/Main";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
function Rejestracja() {
  const navigate = useNavigate();
  const [socket] = useContext<any>(SocketContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [innerPasswordError, setInnerPasswordError] = useState<boolean>(false);

  const PrzeslijFormularz = () => {
    if (password != password2) return;
    socket.emit("registerAttempt", {
      login: email,
      password: md5(password),
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on("registerAttemptResponse", (base64: string) => {
        navigate(`/accountConfirm/${base64}`);
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
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          PrzeslijFormularz();
        }}
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
          // error={password.length < 4 || password.length > 16}
          inputProps={{ minLength: 4, maxLength: 16 }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              PrzeslijFormularz();
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="Powtórz haslo"
          variant="outlined"
          inputProps={{ minLength: 4, maxLength: 16 }}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          error={password != password2}
          required
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              PrzeslijFormularz();
            }
          }}
        />
        <Button
          type="submit"
          sx={{ mt: 1 }}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Stwórz konto
        </Button>
      </Box>
    </Box>
  );
}

export default Rejestracja;
