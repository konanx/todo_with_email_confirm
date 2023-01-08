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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography sx={{ textAlign: "center" }} variant="h6">
          REJESTRACJA
        </Typography>
        <TextField
          id="outlined-basic"
          label="Login"
          variant="outlined"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={login}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Haslo"
          variant="outlined"
          value={login}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Powtórz haslo"
          variant="outlined"
          value={login}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <Button
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
