import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    axios
      .post(
        "http://localhost:5000/products",
        {
          userId: user?.user._id,
        },
        {
          headers: {
            authorization: user?.auth,
          },
        }
      )
      .then(function (response) {
        if (response?.status === 200) {
          setProducts(response.data);
          setLoader(false);
        } else {
          setLoader(false);
          // alert("API not working");
        }
      })
      .catch(function (error) {
        if (error?.status === 401) {
          setLoader(false);
          localStorage.removeItem("user");
          navigate("/login");
        }
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
        if (error?.status === 401) {
          localStorage.removeItem("user");
          navigate("/login");
        }
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
    <>
      <Typography textAlign={"center"} fontWeight={600} variant="h5">
        Products
      </Typography>
      <Box sx={{ width: "100%", height: "20rem" }}>
        <DataGrid
          rows={products}
          loading={loader}
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
    </>
  );
};
