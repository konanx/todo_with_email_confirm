import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
function Second() {
  return (
    <>
      <Box
        sx={{
          padding: 6,
        }}
      >
        <Typography variant="h4">Darmowy pomocnik dla każdego</Typography>
        <Typography variant="subtitle2" mt={2} gutterBottom>
          1. Stwórz konto na platformie w prawym górnym rogu (NIE używaj hasła z
          innych portalów! Projekt jest w fazie beta testów a hasła nie są
          szyfrowane!)
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          2. Zaloguj się do portalu używając swoich danych
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          3. Korzystaj za darmo i zwiększ swoją produktywność
        </Typography>
        <Typography variant="h5" mt={5} gutterBottom>
          UWAGA POŁĄCZENIE Z SERWEREM MOŻE BYĆ NIESTABILNE PODCZAS BETATESTÓW
        </Typography>
      </Box>
    </>
  );
}

export default Second;
