import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const listStockData = createAsyncThunk(
  "auth/listStockData",
  async ({ item, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}${item}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      return { item, data: data.data };
    } catch (error) {
      console.error("Loading Fail", error);
      return rejectWithValue(error.response?.data || "Loading Fail!");
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
    token: null,
    firms: [],
    brands: [],
    sales: [],
    purchases: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listStockData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (payload.item === "firms") {
          state.firms = payload.data;
        } else if (payload.item === "brands") {
          state.brands = payload.data;
        } else if (payload.item === "products") {
          state.products = payload.data;
        } else if (payload.item === "sales") {
          state.sales = payload.data;
        } else if (payload.item === "purchases") {
          state.purchases = payload.data;
        }
      })
      .addCase(listStockData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Loading Failed!";
      });
  },
});

export default stockSlice.reducer;
