import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
import { listStockData } from "../../features/stockSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #365F5F",
  boxShadow: 50,
  p: 4,
};

export default function PurchaseModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.modals["purchase"] || false);
  const { token } = useSelector((state) => state.auth);
  const { purchases, products, firms } = useSelector((state) => state.stock);

  const handleClose = () => {
    dispatch(closeModal("purchase"));
  };

  const [info, setInfo] = useState(() => ({
    firm: "",
    brand: "",
    product: "",
    quantity: "",
    price: "",
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (token && !products) {
      dispatch(listStockData({ item: "purchase", token }));
    }
  }, [dispatch, token, products]);

  useEffect(() => {
    if (token) {
      dispatch(listStockData({ item: "firms", token }));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token && purchases.length === 0) {
      dispatch(listStockData({ item: "purchases", token }));
    }
  }, [dispatch, token, purchases.length]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <InputLabel>Firms</InputLabel>
              <Select
                name="firm"
                value={info.firm || ""}
                onChange={handleChange}
              >
                {[...new Set(firms?.map((firm) => firm.name))].map(
                  (firmName, index) => (
                    <MenuItem key={index} value={firmName}>
                      {firmName}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Brand</InputLabel>
              <Select
                name="brand"
                value={info.brand || ""}
                onChange={handleChange}
              >
                {[
                  ...new Set(products?.map((product) => product.brandId.name)),
                ].map((brandName, index) => (
                  <MenuItem key={index} value={brandName}>
                    {brandName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Product</InputLabel>
              <Select
                name="product"
                value={info.product || ""}
                onChange={handleChange}
              >
                {[...new Set(products?.map((product) => product.name))].map(
                  (productName, index) => (
                    <MenuItem key={index} value={productName}>
                      {productName}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
              value={info.quantity}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
              value={info.price}
              sx={{ mt: 2 }}
            />
            <Button variant="contained" sx={{ mt: 2 }} fullWidth type="submit">
              Add New Purchase
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
