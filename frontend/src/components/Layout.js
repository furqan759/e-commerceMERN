import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export const Layout = ({ children }) => {
  const auth = localStorage.getItem("user");
  return (
    <div className="App">
      <Navbar />
      <h3 style={{ padding: "10px" }}>E-COMMERCE</h3>
      <Box
        sx={{
          mx: 10,
        }}
      >
        {auth && children}
      </Box>
    </div>
  );
};
