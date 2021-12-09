import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postslice.js";
import userReducer from "./usersSlice";

export default configureStore({
  reducer: { posts: postReducer, users: userReducer },
});
