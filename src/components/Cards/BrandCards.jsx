import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { btnStyle } from "../../styles/globalStyles";
import { useSelector } from "react-redux";
import { listStockData } from "../../features/stockSlice";

const BrandCards = () => {
  const dispatch = useDispatch();
  const { token, brands } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && brands.length === 0) {
      dispatch(listStockData({ item: "brands", token }));
    }
  }, [dispatch, token, brands.length]);

  console.log(brands);

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
