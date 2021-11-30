import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connect from "./db/index.js";

import posts from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", posts);

app.get("/", (req, res) => {
  res.send("Hello from server!!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server listening on port ${port}...`));
connect();
