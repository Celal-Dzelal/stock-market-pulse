import * as React from "react";
import { Button, Container, Typography } from "@mui/material";
import FirmCard from "../components/Cards/FirmCard";
import FirmModal from "../components/Modal/FirmModal";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modalSlice";

const Firms = () => {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(openModal("firm"));

  return (
    <Container>
      <Typography variant="h3" color="secondary.main" align="center">
        Firms
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpen}>
        New Firm
      </Button>
      <Typography variant="h4" color="secondary.main" align="center">
        <FirmCard />
      </Typography>
      <FirmModal />
    </Container>
  );
};

export default Firms;
