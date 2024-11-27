import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { StyledBox } from "../styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignWithGoogle } from "./SignWithGoogle";

export const Login = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  const onChangeHandler = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:5000/login", loginData)
      .then(function (response) {
        if (response?.status === 200) {
          localStorage.setItem("user", JSON.stringify(response?.data));
          navigate("/");
        } else {
          alert("Please enter correct details");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <StyledBox>
      <Typography variant="h4" fontWeight={"bold"} mb={3}>
        Login
      </Typography>
      <TextField
        label={"Email"}
        sx={{ marginBottom: "1rem" }}
        type="email"
        name={"email"}
        value={loginData.email}
        onChange={(e) => onChangeHandler(e)}
      />
      <TextField
        label={"Password"}
        sx={{ marginBottom: "1rem" }}
        type="password"
        name={"password"}
        value={loginData.password}
        onChange={(e) => onChangeHandler(e)}
      />
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Button variant="contained" onClick={() => onSubmit()}>
          Login
        </Button>
        <Typography sx={{ my: 1 }}>OR</Typography>
        <SignWithGoogle />
        <Typography sx={{ mt: 3, mb: 1 }}>Don't Have an Account?</Typography>

        <Button variant="contained" onClick={() => navigate("/sign-up")}>
          Register
        </Button>
      </Box>
    </StyledBox>
  );
};
