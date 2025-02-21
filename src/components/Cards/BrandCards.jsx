import * as React from "react";
import { Card, CardHeader, CardMedia, CardActions, Grid } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { btnStyle } from "../../styles/globalStyles";
import useEffectHook from "../../hook/useEffectHook";

const BrandCards = () => {
  const { brands } = useEffectHook();

  return (
    <Grid container spacing={2} mt={2}>
      {brands
        ? brands.map((brand) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={brand._id}>
              <Card
                sx={{
                  height: 390,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "0.5rem",
                  cursor: "pointer",
                  "&:hover": {
                    fontWeight: "bolder",
                    border: "2px solid #365F5F",
                    boxShadow: "5px 5px 5px #5F7479",
                  },
                }}
              >
                <CardHeader title={brand.name} subheader={brand.address} />
                <CardMedia
                  sx={{ height: 140, objectFit: "contain" }}
                  component="img"
                  image={brand.image}
                  alt={brand.name}
                />
                <CardActions sx={{ justifyContent: "center", gap: 2 }}>
                  <EditIcon sx={btnStyle} />
                  <DeleteIcon sx={btnStyle} />
                </CardActions>
              </Card>
            </Grid>
          ))
        : "Loading..."}
    </Grid>
  );
};

export default BrandCards;
