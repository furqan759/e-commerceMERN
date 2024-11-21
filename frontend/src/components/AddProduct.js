import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const navigate = useNavigate();
  let auth = localStorage.getItem("user");
  auth = JSON.parse(auth);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  console.log({ productDetails });

  const onChangeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const createProduct = () => {
    axios
      .post(
        "http://localhost:5000/add-product",
        {
          ...productDetails,
          userId: auth._id,
        },
        { headers: { authorization: auth?.auth } }
      )
      .then(function (response) {
        if (response?.status === 200) {
          console.log(response);
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error?.status === 401) {
          localStorage.removeItem("user");
          navigate("/login");
        }
      });
  };

  return (
    <Box>
      <Typography textAlign={"center"} fontWeight={600} variant="h5">
        Add Product:
      </Typography>
      <Grid2 container mt={3} mx={12} justifyContent={"center"}>
        <Grid2 item size={{ lg: 6 }} pb={2} pr={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={productDetails.name}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid2>
        <Grid2 item size={{ lg: 6 }}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={productDetails.price}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid2>
        <Grid2 item size={{ lg: 6 }} pb={2} pr={2}>
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={productDetails.category}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid2>
        <Grid2 item size={{ lg: 6 }}>
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={productDetails.company}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid2>
        <Button
          variant="outlined"
          onClick={() => createProduct()}
          sx={{ mt: 3 }}
        >
          Create
        </Button>
      </Grid2>
    </Box>
  );
};
