import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export const Products = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then(function (response) {
        if (response?.status === 200) {
          setProducts(response.data);
        } else {
          alert("API not working");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    {
      field: "name",
      headerName: "Product Name",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 160,
      editable: true,
    },
    {
      field: "company",
      headerName: "Company",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        disableColumnMenu
        getRowId={(row) => row?._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
