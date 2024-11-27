import { Avatar, Box, Button, IconButton } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "./firebase";
import { SignInWithGoogle } from "../assets/img";
import { useNavigate } from "react-router-dom";

export const SignWithGoogle = () => {
  const navigate = useNavigate();
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
      if (result?.user?.emailVerified) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            auth: result?.user?.accessToken,
            user: {
              name: result?.user?.displayName,
              email: result?.user?.email,
              avatar: result?.user?.photoURL,
              emailVerified: result?.user?.emailVerified,
            },
          })
        );
        navigate("/");
      }
    });
  };

  return (
    <Box onClick={() => googleLogin()} sx={{ cursor: "pointer" }}>
      <img src={SignInWithGoogle} height={"40px"} alt="333" />
    </Box>
  );
};
