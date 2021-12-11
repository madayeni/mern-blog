import User from "../models/user.js";
import validator from "../validations/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { password } = req.body;
  const { error } = validator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        password,
      },
      { new: true }
    );
    res.send(updatedPost);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};
