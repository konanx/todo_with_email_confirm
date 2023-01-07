import {
  Box,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Button,
} from "@mui/material";
import React, { useRef, useState, useContext } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../contexts/Main";
import { LoginAttemptFromClientSide } from "../../interfaces";
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
        <Button
          sx={{ mt: 3 }}
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
    </>
  );
}

export default Logowanie;
