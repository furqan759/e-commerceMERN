import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const auth = localStorage.getItem("user");
  return (
    <div className="App">
      <Navbar />
      <h3 style={{ padding: "10px" }}>E-COMMERCE</h3>
      {auth && <Outlet />}
    </div>
  );
};
