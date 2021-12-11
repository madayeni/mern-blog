import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, addPost);
router.get("/:id", getSinglePost);
router.delete("/:id", auth, deletePost);
router.put("/:id", auth, updatePost);

export default router;
