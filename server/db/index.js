import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectionURI = process.env.CONNECTION_URI;

const connect = async () => {
  await mongoose.connect(connectionURI);
  console.log("connected to MongoDB...");
};

export default connect;
