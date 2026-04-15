import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

// routes
app.use("/auth", authRoutes);

//  error middleware 
app.use(errorHandler);

export default app;