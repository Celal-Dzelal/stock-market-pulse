import React, { useState } from "react";
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
import useEffectHook from "../../hook/useEffectHook";

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

export default function ProductModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.modals["product"] || false);
  const { products } = useEffectHook();

  const handleClose = () => {
    dispatch(closeModal("product"));
    setInfo("");
  };

  const [info, setInfo] = useState(() => ({
    category: "",
    brand: "",
    name: "",
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
              <InputLabel>Categories</InputLabel>
              <Select
                name="category"
                value={info.category || ""}
                onChange={handleChange}
              >
                {[
                  ...new Set(
                    products?.map((product) => product.categoryId.name)
                  ),
                ].map((categoryName, index) => (
                  <MenuItem key={index} value={categoryName}>
                    {categoryName}
                  </MenuItem>
                ))}
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
            <TextField
              label="Product Name"
              name="name"
              type="text"
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
              value={info.name || ""}
              sx={{ mt: 2 }}
            />
            <Button variant="contained" sx={{ mt: 2 }} fullWidth type="submit">
              Add New Product
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
