import React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
import { useState } from "react";

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

export default function BrandModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.modals["brand"] || false);

  const handleClose = () => {
    dispatch(closeModal("brand"));
  };

  const [info, setInfo] = useState({
    name: "",
    image: "",
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
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
            <TextField
              label="Brand Name"
              name="name"
              type="text"
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
              value={info.brandname}
            />
            <TextField
              label="Brand Logo"
              name="image"
              type="url"
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
              value={info.brandlogo}
              sx={{ mt: 2 }}
            />
            <Button variant="contained" sx={{ mt: 2 }} fullWidth type="submit">
              Add New Brand
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
