import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import React from "react";

export const AddProduct = () => {
  const auth = localStorage.getItem("users");
  return (
    <Box>
      <Typography textAlign={"center"} fontWeight={600} variant="h5">
        Add Product:
      </Typography>
      <Grid2 container mt={3} mx={12} justifyContent={"center"}>
        <Grid2 item size={{ lg: 6 }} pb={2} pr={2}>
          <TextField fullWidth label="Name" />
        </Grid2>
        <Grid2 item size={{ lg: 6 }}>
          <TextField fullWidth label="Price" />
        </Grid2>
        <Grid2 item size={{ lg: 6 }} pb={2} pr={2}>
          <TextField fullWidth label="Category" />
        </Grid2>
        <Grid2 item size={{ lg: 6 }}>
          <TextField fullWidth label="Company" />
        </Grid2>
        <Button variant="outlined" sx={{ mt: 3 }}>
          Create
        </Button>
      </Grid2>
    </Box>
  );
};
