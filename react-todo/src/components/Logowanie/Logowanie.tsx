import {
  Box,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import React, { useRef, useState, useContext, useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../contexts/Main";
import { LoginAttemptFromClientSide } from "../../interfaces";
import { Link, useNavigate } from "react-router-dom";
import md5 from "md5";
function Logowanie() {
  const navigate = useNavigate();
  // @ts-ignore
  const [socket] = useContext(SocketContext);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  useEffect(() => {
    if (socket) {
      socket.on("udaneLogowanie", (data: any) => {
        sessionStorage.setItem("auth", JSON.stringify(data));
        navigate("/panel");
      });
    }
  }, []);
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
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            socket.emit("loginAttempt", {
              login,
              password: md5(password),
            });
          }}
        >
          <FormControl variant="standard" required>
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
          <FormControl variant="standard" sx={{ mt: 1 }} required>
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
          <Link to="/register">
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
            type="submit"
            sx={{ mt: 1 }}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Zaloguj
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Logowanie;
