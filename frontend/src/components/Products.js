import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}`)
      .then(function (response) {
        if (response?.status === 200) {
          getProducts();
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
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (row) => {
        console.log(row);
        return (
          <>
            <IconButton
              onClick={() => navigate(`/edit-product/${row.row?._id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteProduct(row.row?._id)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
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
