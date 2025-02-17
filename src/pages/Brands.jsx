import React from "react";
import BrandCards from "../components/Cards/BrandCards";
import { Button, Container, Typography } from "@mui/material";

const Brands = () => {
  return (
    <Container>
      <Button variant="contained" sx={{ mt: 2 }}>
        NEW BRAND
      </Button>
      <Typography variant="h4" color="secondary.main" align="center">
        <BrandCards />
      </Typography>
    </Container>
  );
};

export default Brands;
