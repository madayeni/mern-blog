import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api";
import { sortCriteria, sortString } from "../helper";

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
      const value = action.payload.value;
      const { sortBy, dir } = sortCriteria(value);
      state.filteredPosts.sort((p1, p2) =>
        sortString(p1[sortBy], p2[sortBy], dir)
      );
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
