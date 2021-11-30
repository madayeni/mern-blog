import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
