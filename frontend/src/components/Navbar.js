import React, { useEffect } from "react";
import { Box, Divider, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { StyledLink } from "../styles/navbar";
import { getAuth } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // const checkAuth = async () => {
  //   await getAuth();
  // };

  const logout = async () => {
    localStorage.removeItem("user");
    await getAuth().signOut();
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
            {/* <Grid2 item>
              <StyledLink to={"/edit-product/:id"}>Update Products</StyledLink>
            </Grid2> */}
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
