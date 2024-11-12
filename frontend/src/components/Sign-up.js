import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { StyledBox } from "../styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [signUpData, setsignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  const onChangeHandler = (e) => {
    setsignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:5000/register", signUpData)
      .then(function (response) {
        if (response?.status === 200) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response?.data));
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <StyledBox>
      <Typography variant="h4" fontWeight={"bold"} mb={3}>
        Sign Up
      </Typography>
      <TextField
        label={"Name"}
        sx={{ marginBottom: "1rem" }}
        type="text"
        name={"name"}
        value={signUpData.name}
        onChange={(e) => onChangeHandler(e)}
      />
      <TextField
        label={"Email"}
        sx={{ marginBottom: "1rem" }}
        type="email"
        name={"email"}
        value={signUpData.email}
        onChange={(e) => onChangeHandler(e)}
      />
      <TextField
        label={"Password"}
        sx={{ marginBottom: "1rem" }}
        type="password"
        name={"password"}
        value={signUpData.password}
        onChange={(e) => onChangeHandler(e)}
      />
      <Button variant="contained" onClick={() => onSubmit()}>
        Register
      </Button>
    </StyledBox>
  );
}
