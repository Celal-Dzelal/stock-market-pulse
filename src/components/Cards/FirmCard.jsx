import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { btnStyle } from "../../styles/globalStyles";
import { listStockData } from "../../features/stockSlice";
import Firms from "../../pages/Firms";

const FirmCard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { firms } = useSelector((state) => state.stock);

  useEffect(() => {
    if (token && firms.length === 0) {
      dispatch(listStockData({ item: "firms", token }));
    }
  }, []);

  console.log(firms);

  // const handleDelete = (id) => {
  //   dispatch(deleteStockData({ token, id }));
  // };

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
                    // onClick={() => handleDelete(firm._id)}
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
