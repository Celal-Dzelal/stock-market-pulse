import React from "react";
import BrandCards from "../components/Cards/BrandCards";
import { Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modalSlice";
import BrandModal from "../components/Modal/BrandModal";

const Brands = () => {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(openModal("brand"));

  return (
    <Container>
      <Typography variant="h3" color="secondary.main" align="center">
        Brands
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpen}>
        New Brand
      </Button>
      <Typography variant="h4" color="secondary.main" align="center">
        <BrandCards />
      </Typography>
      <BrandModal />
    </Container>
  );
};

export default Brands;
