import Post from "../models/post.js";
import validator from "../validations/post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.send(posts);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const addPost = async (req, res) => {
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
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found!");
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
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
};

export const changePost = async (req, res) => {
  const { type } = req.body;
  let updatedPost;
  try {
    const post = await Post.findById(req.params.id);
    if (type === "like") {
      if (!post.likes.includes(req.body.payload)) {
        updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            likes: [...post.likes, req.body.payload],
          },
          { new: true }
        );
      } else {
        updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            likes: post.likes.filter((like) => like !== req.body.payload),
          },
          { new: true }
        );
      }
    } else if (type === "comment") {
      updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          comments: [req.body.payload, ...post.comments],
        },
        { new: true }
      );
    }
    res.send(updatedPost);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};
