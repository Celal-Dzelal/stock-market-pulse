import { Container, Typography, Button } from "@mui/material";
import React from "react";
import ProductsTable from "../components/Tables/ProductsTable";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modalSlice";
import ProductModal from "../components/Modal/ProductModal";

const Products = () => {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(openModal("product"));

  return (
    <Container>
      <Typography variant="h3" color="secondary.main" align="center">
        Products
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpen}>
        New Product
      </Button>
      <ProductsTable />
      <ProductModal />
    </Container>
  );
};

export default Products;
