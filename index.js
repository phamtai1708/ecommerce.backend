import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
await mongoose.connect(process.env.MONGODB_URL);
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(JSON.parse(process.env.CLOUDINARY_CONFIG));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { RootRouterV1 } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/", RootRouterV1);

app.listen(8080, () => {
  console.log("Server is running!");
});
