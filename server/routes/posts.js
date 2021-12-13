import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  getSinglePost,
  changePost,
  updatePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.patch("/:id", changePost);
router.get("/:id", getSinglePost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
