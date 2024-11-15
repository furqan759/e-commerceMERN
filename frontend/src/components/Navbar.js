import { Box, Divider, Grid2 } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { StyledLink } from "../styles/navbar";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <Box sx={{ backgroundColor: "gray" }}>
      <Grid2 container alignItems={"center"} spacing={2}>
        {auth ? (
          <>
            <Grid2 item>
              <img src={Logo} height={"52rem"} width={"52rem"} alt="logo" />
            </Grid2>
            <Grid2 item>
              <StyledLink to={"/"}>Products</StyledLink>
            </Grid2>
            <Grid2 item>
              <StyledLink to={"/add"}>Add Products</StyledLink>
            </Grid2>
            <Grid2 item>
              <StyledLink to={"/update"}>Update Products</StyledLink>
            </Grid2>
            <Grid2 item>
              <StyledLink to={"/profile"}>Profile</StyledLink>
            </Grid2>
            <Grid2 item>
              <StyledLink onClick={() => logout()} to={"/login"}>
                Logout
              </StyledLink>
            </Grid2>
          </>
        ) : (
          <>
            <Grid2 item>
              <img src={Logo} height={"52rem"} width={"52rem"} alt="logo" />
            </Grid2>
            <Grid2 item>
              <StyledLink to={"/login"}>Login</StyledLink>
            </Grid2>
            <Grid2 item>
              <StyledLink to={"/sign-up"}>Sign Up</StyledLink>
            </Grid2>
          </>
        )}
      </Grid2>
      <Divider />
    </Box>
  );
}
