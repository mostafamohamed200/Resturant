import express from "express";
import { createOrderHandler } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 👇 waiter و admin فقط يعملوا order
router.post(
  "/orders",
  authMiddleware,
  roleMiddleware("waiter", "admin"),
  (req, res) => {
    res.json({ message: "Order created" });
  }
);

// 👇 chef يشوف الطلبات
router.get(
  "/orders",
  authMiddleware,
  roleMiddleware("chef", "admin"),
  (req, res) => {
    res.json({ message: "Orders list" });
  }
);

export default router;