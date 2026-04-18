import express from "express";
import { createOrderHandler } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/orders", authMiddleware, createOrderHandler);

export default router;