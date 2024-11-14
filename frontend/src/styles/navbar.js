import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#fff",
  textTransform: "Uppercase",
}));
