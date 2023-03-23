import { Alert, Backdrop, CircularProgress, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { SocketContext } from "./components/contexts/Main";
import { setServerStatus } from "./features/serverOfflineSlice";
function ServerOffline() {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.serverOffline.active);
  const [socket] = useContext<any>(SocketContext);
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        dispatch(setServerStatus(true));
      });
      socket.on("disconnect", () => {
        dispatch(setServerStatus(false));
      });
    }
  }, [socket]);
  return (
    <>
      <Backdrop
        open={!status}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          background: "rgba(0, 0, 0, .4)",
        }}
      >
        <Typography variant="h6">SERVER JEST OFFLINE</Typography>
        <CircularProgress />
      </Backdrop>
    </>
  );
}

export default ServerOffline;
