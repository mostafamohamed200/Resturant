import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);

// error middleware
app.use(errorHandler);

export default app;