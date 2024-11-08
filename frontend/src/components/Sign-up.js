import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { StyledBox } from "../styles";

export default function SignUp() {
  const [signUpData, setsignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setsignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    console.log(signUpData);
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
