import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/*//! --------------------------------- LOGOUT --------------------------------- */

export const logout = createAsyncThunk(
  "auth/logout",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}auth/logout`, {
        headers: { Authorization: `Token ${token}` },
      });
      // console.log("Logout Success", data);
      return data;
    } catch (error) {
      console.error("Logout Fail", error);
      return rejectWithValue(error.response?.data || "Logout Fail!");
    }
  }
);

/*//! -------------------------------- REGISTER -------------------------------- */

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}users/`, userInfo);
      // console.log("Register Success", data);
      return data;
    } catch (error) {
      console.error("Register Fail", error);
      return rejectWithValue(error.response?.data || "Register Fail!");
    }
  }
);

/*//! ---------------------------------- LOGIN --------------------------------- */

export const login = createAsyncThunk(
  "auth/login",
  async (userInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}auth/login`, userInfo);
      return data;
    } catch (error) {
      console.error("Login Fail", error);
      return rejectWithValue(error.response?.data || "Login Fail!");
    }
  }
);

/*//! -------------------------------- GET FIRMS ------------------------------- */

export const firms = createAsyncThunk(
  "auth/firms",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}firms`, {
        headers: { Authorization: `Token ${token}` },
      });
      return data.data;
    } catch (error) {
      console.error("Loading Fail", error);
      return rejectWithValue(error.response?.data || "Loading Fail!");
    }
  }
);

const BASE_URL = import.meta.env.VITE_BASE_URL;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
    token: null,
    firms: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentUser = payload.user;
        state.token = payload.token;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Register Failed!";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentUser = payload.user;
        state.token = payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Login Failed!";
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
        state.token = null;
        state.error = null;
      })
      .addCase(firms.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.firms = payload;
      })

      .addCase(firms.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Loading Failed!";
      });
  },
});

export default authSlice.reducer;
