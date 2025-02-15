import { Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FirmCard from "../components/Cards/FirmCard";

const Firms = () => {
  const dispatch = useDispatch();
  const { token, firms } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !firms) {
      dispatch(firms(token));
    }
  }, [dispatch, token, firms]);

  console.log(firms);

  return (
    <Container>
      <Typography variant="h4" color="secondary.main" align="center">
        <FirmCard />
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        NEW FIRM
      </Button>
    </Container>
  );
};

export default Firms;
