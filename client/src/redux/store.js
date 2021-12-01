import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postslice.js";

export default configureStore({ reducer: { posts: postReducer } });
