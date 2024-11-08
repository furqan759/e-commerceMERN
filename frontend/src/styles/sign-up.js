import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "10rem 25rem 10rem 25rem",
}));
