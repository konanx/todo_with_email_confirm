import React, { useState, useEffect, useContext, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SocketContext } from "../contexts/Main";
function AddToDoListDialog() {
  const [socket] = useContext(SocketContext);
  const nowaListaRef = useRef(null);
  const [open, setOpen] = useState(false);

  const DodajNowaListe = () => {
    let user: any = sessionStorage.getItem("auth");
    user = JSON.parse(la);
    if (!user) return;
    socket.emit("dodajNowaListe", { id: user.id, name: nowaListaRef.current });
  };

  return (
    <div>
      <IconButton aria-label="delete">
        <AddIcon
          onClick={() => {
            setOpen(true);
          }}
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Dodaj nową listę</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lista będzie widoczna tylko dla Ciebie, szczegóły możesz edytować w
            każdej chwili
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Wpisz nazwę..."
            type="text"
            fullWidth
            variant="standard"
            ref={nowaListaRef}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            ANULUJ
          </Button>
          <Button>DODAJ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddToDoListDialog;
