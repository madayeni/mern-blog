import Post from "../models/post.js";
import express from "express";
import validator from "../validations/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.send(posts);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { title, body, photo, author, tags } = req.body;
  const { error } = validator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
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
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send("Post not found!");
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { title, body, photo, author, tags } = req.body;
  const { error } = validator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        body,
        photo,
        author,
        tags,
      },
      { new: true }
    );
    res.send(updatedPost);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

export default router;
