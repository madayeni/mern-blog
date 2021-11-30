import Post from "../models/post.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, body, photo, author, tags } = req.body;

  let post = new Post({
    title,
    body,
    photo,
    author,
    tags,
  });
  try {
    post = await post.save();
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

export default router;
