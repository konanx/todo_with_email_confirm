import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
function Rejestracja() {
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
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
          autoComplete="off"
          type="login"
          id="outlined-basic"
          label="Login"
          variant="outlined"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
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
          //   onClick={}
        >
          Stwórz konto
        </Button>
      </Box>
    </Box>
  );
}

export default Rejestracja;
