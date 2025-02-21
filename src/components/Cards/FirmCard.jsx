import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { btnStyle } from "../../styles/globalStyles";
import { deleteStockData } from "../../features/stockSlice";
import useEffectHook from "../../hook/useEffectHook";

const FirmCard = () => {
  const { firms } = useEffectHook();

  const handleDelete = (id) => {
    dispatch(deleteStockData({ token, id }));
  };

  return (
    <Grid container spacing={2} mt={2}>
      {firms
        ? firms.map((firm) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={firm._id}>
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
                <CardHeader title={firm.name} subheader={firm.address} />
                <CardMedia
                  sx={{ height: 140, objectFit: "contain" }}
                  component="img"
                  image={firm.image}
                  alt={firm.name}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Phone: {firm.phone}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", gap: 2 }}>
                  <EditIcon sx={btnStyle} />
                  <DeleteIcon
                    sx={btnStyle}
                    onClick={() => handleDelete(firm._id)}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))
        : "Loading..."}
    </Grid>
  );
};

export default FirmCard;
