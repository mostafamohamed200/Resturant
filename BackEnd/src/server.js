import express from "express";
import dotenv from "dotenv";
import app from "./app.js";
import orderRoutes from "./routes/ordersRoutes.js";

dotenv.config();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
app.use("/api", orderRoutes);