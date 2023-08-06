import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
// middleware global
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//middleware for routes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
//mongodb Setup
const URL = process.env.URL;
const PORT = process.env.PORT;
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log("It is listening")))
  .catch((error) => console.log(error.message));
