import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postslice.js";
import authReducer from "./authSlice";

export default configureStore({
  reducer: { posts: postReducer, auth: authReducer },
});
