import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Panel() {
  const navigate = useNavigate();
  useEffect(() => {
    let la = sessionStorage.getItem("auth");
    console.log(la);
    if (!la) {
      // navigate("../login");
    }
  }, []);
  return (
    <>
      <CssBaseline />
      <SideBar />
    </>
  );
}

export default Panel;
