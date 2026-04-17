import express from "express";
import { getMeals, addMeal } from "../controllers/mealsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/meals", getMeals);
router.post("/meals", authMiddleware, addMeal);

export default router;