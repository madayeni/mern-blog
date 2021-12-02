import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseURL + "posts", post);
      return { post: res.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(baseURL + "posts");
      return { posts: res.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posts: [],
  filteredPosts: [],
  error: null,
  loading: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    sortPosts: (state, action) => {
      const sortBy = action.payload.sortBy;
      if (sortBy === "newest") {
        state.filteredPosts.sort((p1, p2) => p1.title - p2.title);
      } else if (sortBy === "oldest") {
        state.filteredPosts.sort((p1, p2) => p2.title - p1.title);
      }
    },
    searchPosts: (state, action) => {
      const key = action.payload;
      state.filteredPosts = state.posts.filter((post) =>
        post.title.includes(key)
      );
    },
  },
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
      state.filteredPosts = action.payload.posts;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { sortPosts, searchPosts } = postSlice.actions;

export default postSlice.reducer;
