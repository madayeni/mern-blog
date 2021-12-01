import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseURL + "posts", post);
      console.log(res.data);

      return { post: res.data };
    } catch (error) {
      //   console.log(error.response.status);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(baseURL + "posts");
      console.log(res.data);

      return { posts: res.data };
    } catch (error) {
      //   console.log(error.response.status);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posts: [],
  error: null,
  loading: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [addPost.pending]: (state) => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.posts.push(action.payload.post);
    },
    [addPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.posts = action.payload.posts;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
