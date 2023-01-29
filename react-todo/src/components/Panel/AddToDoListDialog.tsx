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
  const [socket] = useContext<any>(SocketContext);
  const [addName, setAddName] = useState("");
  const [open, setOpen] = useState(false);

  const DodajNowaListe = () => {
    let user: any = sessionStorage.getItem("auth");
    user = JSON.parse(user);
    if (!user) return;
    socket.emit("dodajNowaListe", { person_id: user.id, name: addName });
    setOpen(false);
    setAddName("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("dodajNowaListeResponse", (data: any) => {
        let session: any = sessionStorage.getItem("auth");
        session = JSON.parse(session);
        socket.emit("pobierzListyToDo", session.id);
      });
    }
  }, [socket]);

  return (
    <div>
      <IconButton
        aria-label="delete"
        onClick={() => {
          setOpen(true);
        }}
      >
        <AddIcon />
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
            value={addName}
            onChange={(e) => {
              setAddName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (addName) {
                  DodajNowaListe();
                }
              }
            }}
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
          <Button
            onClick={() => {
              if (addName) {
                DodajNowaListe();
              }
            }}
          >
            DODAJ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddToDoListDialog;
