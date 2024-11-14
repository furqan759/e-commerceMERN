import { Box, Grid } from "@mui/material";
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
    <Box sx={{ backgroundColor: "green" }}>
      <Grid container alignItems={"center"} spacing={2}>
        {auth ? (
          <>
            <Grid item>
              <img src={Logo} height={"52rem"} width={"52rem"} alt="logo" />
            </Grid>
            <Grid item>
              <StyledLink to={"/"}>Products</StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to={"/add"}>Add Products</StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to={"/update"}>Update Products</StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to={"/profile"}>Profile</StyledLink>
            </Grid>
            <Grid item>
              <StyledLink onClick={() => logout()} to={"/login"}>
                Logout
              </StyledLink>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <img src={Logo} height={"52rem"} width={"52rem"} alt="logo" />
            </Grid>
            <Grid item>
              <StyledLink to={"/login"}>Login</StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to={"/sign-up"}>Sign Up</StyledLink>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
