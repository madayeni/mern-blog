import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectionURI = process.env.CONNECTION_URI;

const connect = async () => {
  try {
    await mongoose.connect(connectionURI);
    console.log("connected to MongoDB...");
  } catch (error) {
    console.log("MongoDB connection failed...", error.message);
  }
};

export default connect;
