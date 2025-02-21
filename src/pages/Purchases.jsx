import React from "react";
import PurchaseTable from "../components/Tables/PurchaseTable";
import { Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modalSlice";
import PurchaseModal from "../components/Modal/PurchaseModal";

const Purchases = () => {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(openModal("purchase"));
  return (
    <div>
      <Container>
        <Typography variant="h3" color="secondary.main" align="center">
          Purchases
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpen}>
          New Purchase
        </Button>
      </Container>
      <PurchaseTable />
      <PurchaseModal />
    </div>
  );
};

export default Purchases;
