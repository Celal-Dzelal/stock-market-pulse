import * as React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
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

export default function FirmModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.modals["firm"]) || false;

  const handleClose = () => {
    dispatch(closeModal("firm"));
  };

  const [info, setInfo] = useState({
    name: "",
    address: "",
    phone: "",
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
              label="Firm Name"
              name="name"
              type="text"
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
              value={info.name}
            />
            <TextField
              label="Phone Number"
              name="phone"
              type="phone"
              variant="outlined"
              required
              fullWidth
              sx={{ mt: 2 }}
              onChange={handleChange}
              value={info.phone}
            />
            <TextField
              label="Address"
              name="address"
              type="text"
              variant="outlined"
              required
              fullWidth
              sx={{ mt: 2 }}
              onChange={handleChange}
              value={info.address}
            />
            <TextField
              label="Firm Logo"
              name="image"
              type="url"
              variant="outlined"
              required
              fullWidth
              sx={{ mt: 2 }}
              onChange={handleChange}
              value={info.image}
            />
            <Button variant="contained" sx={{ mt: 2 }} fullWidth type="submit">
              Add New Firm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
