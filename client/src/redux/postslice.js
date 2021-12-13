import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api";
import { sortCriteria, sortString } from "../helper";
import { toast } from "react-toastify";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseURL + "posts", post);
      toast.success("Post added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { post: res.data };
    } catch (error) {
      toast.error(error.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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

export const getPost = createAsyncThunk(
  "posts/getPost",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(baseURL + "posts/" + id);
      return { post: res.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ id, user_id }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(baseURL + "posts/" + id, {
        type: "like",
        payload: user_id,
      });
      return { post: res.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentOnPost = createAsyncThunk(
  "posts/commentOnPost",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(baseURL + "posts/" + id, {
        type: "comment",
        payload: comment,
      });
      return { post: res.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(baseURL + "posts/" + id);
      toast.success("Post deleted successfully!");
      return { id: res.data._id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, title, body, photo, author }, { rejectWithValue }) => {
    try {
      const res = await axios.put(baseURL + "posts/" + id, {
        title,
        body,
        photo,
        author,
      });
      return { post: res.data, id };
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
  sortBy: "newest",
  curPost: null,
  editMode: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    sortPosts: (state, action) => {
      const value = action.payload.value;
      state.sortBy = value;
      const { sortBy, dir } = sortCriteria(value);
      state.filteredPosts.sort((p1, p2) => {
        if (sortBy === "createdAt")
          return sortString(p1[sortBy], p2[sortBy], dir);
        else return p1[sortBy].length > p2[sortBy].length ? -1 : 1;
      });
    },
    searchPosts: (state, action) => {
      const key = action.payload;
      state.filteredPosts = state.posts.filter((post) =>
        post.title.toLowerCase().includes(key)
      );
    },
    changeEditMode: (state, action) => {
      state.editMode = action.payload;
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
      state.curPost = null;
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
      state.curPost = null;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getPost.pending]: (state) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.curPost = action.payload.post;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [likePost.pending]: (state) => {
      state.loading = true;
    },
    [likePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.curPost = action.payload.post;
    },
    [likePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [commentOnPost.pending]: (state) => {
      state.loading = true;
    },
    [commentOnPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.curPost = action.payload.post;
    },
    [commentOnPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.curPost = null;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.id
      );
      state.filteredPosts = [...state.posts];
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [editPost.pending]: (state) => {
      state.loading = true;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.posts = state.posts.map((post) =>
        post._id === action.payload.id ? action.payload.post : post
      );
      state.filteredPosts = [...state.posts];
      state.curPost = action.payload.post;
    },
    [editPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { sortPosts, searchPosts, changeEditMode } = postSlice.actions;

export default postSlice.reducer;
