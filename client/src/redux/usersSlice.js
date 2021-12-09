import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api";
import jwtDecode from "jwt-decode";

export const signup = createAsyncThunk(
  "users/signup",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseURL + "signup", user);
      console.log(res.data);
      return { token: res.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  "users/signin",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseURL + "signin", user);
      console.log(res.data);
      return { token: res.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  error: null,
  loading: null,
  username: null,
  email: null,
  id: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signout: (state, action) => {
      state.token = null;
      state.email = null;
      state.username = null;
      state.id = null;
    },
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.token = action.payload.token;
      const user = jwtDecode(action.payload.token);
      state.username = user.username;
      state.email = user.email;
      state.id = user._id;
    },
    [signup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [signin.pending]: (state) => {
      state.loading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.token = action.payload.token;
      const user = jwtDecode(action.payload.token);
      state.username = user.username;
      state.email = user.email;
      state.id = user._id;
    },
    [signin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signout } = usersSlice.actions;

export default usersSlice.reducer;
