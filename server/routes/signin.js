import express from "express";
import validator from "../validations/signup.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, email, password, avatar } = req.body;
  const { error } = validator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = new User({
    username,
    email,
    password,
  });
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

export default router;
