import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    toggleModal: (state, action) => {
      state.modals[action.payload] = !state.modals[action.payload];
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
