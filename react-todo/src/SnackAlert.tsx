import React from "react";
import { Snackbar, Alert } from "@mui/material";

function SnackAlert() {
  return (
    <>
      <Snackbar open={true} autoHideDuration={3000}>
        <Alert
          severity="success"
          anchorOrigin={"top-left"}
          onClose={() => alert("dsa")}
        >
          TEST
        </Alert>
      </Snackbar>
    </>
  );
}

export default SnackAlert;
