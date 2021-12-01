import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseURL + "posts", post);
      console.log(res.data);
      console.log(12);
      return { post: res.data };
    } catch (error) {
      console.log(11);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(13);
      return rejectWithValue(error);
    }
  }
);

// export const getPosts = createAsyncThunk("posts/getPosts", async())

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
    [addPost.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default postSlice.reducer;
