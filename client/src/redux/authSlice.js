import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseURL + "signup", user);
      console.log(res.data);
      toast.success("Welcome!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { token: res.data };
    } catch (error) {
      toast.error(error.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseURL + "signin", user);
      console.log(res.data);
      toast.success("Welcome!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { token: res.data };
    } catch (error) {
      toast.error(error.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state, action) => {
      state.token = null;
      state.email = null;
      state.username = null;
      state.id = null;
      toast.success("Bye!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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

export const { signout } = authSlice.actions;

export default authSlice.reducer;
