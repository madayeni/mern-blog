import express from "express";
import {
  deleteUser,
  getUsers,
  getSingleUser,
  updateUser,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

export default router;
