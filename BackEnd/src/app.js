import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import mealsRoutes from "./routes/mealsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";

const app = express();

app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/api", mealsRoutes);
app.use("/api", ordersRoutes);

// error middleware (آخر حاجة)
app.use(errorHandler);

export default app;