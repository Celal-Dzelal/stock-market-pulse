import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const listStockData = createAsyncThunk(
  "stock/listStockData",
  async ({ item, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}${item}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      return { item, token, data: data.data };
    } catch (error) {
      console.error("Loading Fail", error);
      return rejectWithValue(error.response?.data || "Loading Fail!");
    }
  }
);

export const deleteStockData = createAsyncThunk(
  "stock/deleteStockData",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}firms/${id}`;
      const { data } = await axios.delete(url, {
        headers: { Authorization: `Token ${token}` },
      });
      return { data: data.data, id };
    } catch (error) {
      console.error("Delete Fail", error.response || error.message);
      return rejectWithValue(error.response?.data || "Delete Fail!");
    }
  }
);

export const createStockData = createAsyncThunk(
  "stock/createStockData",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}firms/`, {
        headers: { Authorization: `Token ${token}` },
      });
      return { data: data.data };
    } catch (error) {
      console.error("Create Fail", error.response || error.message);
      return rejectWithValue(error.response?.data || "Create Fail!");
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
      })
      .addCase(deleteStockData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.firms = state.firms.filter((firm) => firm._id !== payload.id);
      });
  },
});

export default stockSlice.reducer;
