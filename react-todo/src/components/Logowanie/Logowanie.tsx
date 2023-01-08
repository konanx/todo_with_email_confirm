import {
  Box,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import React, { useRef, useState, useContext } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../contexts/Main";
import { LoginAttemptFromClientSide } from "../../interfaces";
import { Link } from "react-router-dom";
function Logowanie() {
  // @ts-ignore
  const [socket] = useContext(SocketContext);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <Box
        mt={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl variant="standard">
            <InputLabel htmlFor="input-login">Login</InputLabel>
            <Input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              id="input-login"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" sx={{ mt: 1 }}>
            <InputLabel htmlFor="input-password">Hasło</InputLabel>
            <Input
              id="input-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <Link to="/rejestracja">
            <Typography
              variant="caption"
              sx={{ mt: 1, textDecoration: "none", color: "white" }}
            >
              Nie masz konta? Zarejestruj
            </Typography>
          </Link>
          <Link to="/forgot-pasword">
            <Typography
              variant="caption"
              sx={{ textDecoration: "none", color: "white" }}
            >
              Nie pamiętasz hasła?
            </Typography>
          </Link>
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() =>
              socket.emit("loginAttempt", {
                login,
                password,
              })
            }
          >
            Zaloguj
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Logowanie;
