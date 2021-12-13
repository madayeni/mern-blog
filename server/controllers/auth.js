import signupValidator from "../validations/signup.js";
import signinValidator from "../validations/signin.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  let { user, password } = req.body;
  const { error } = signinValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    let username = await User.findOne({ username: user }).select("+password");
    let email = await User.findOne({ email: user }).select("+password");
    if (!email && !username) {
      return res.status(400).send("Wrong credentials");
    }
    user = username || email;
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).send("Wrong credentials");
    }
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      secretKey
    );
    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const { error } = signupValidator.validate(req.body);
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
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      secretKey
    );
    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};
