import express from "express";
import TableController from "../controllers/TableController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, TableController.getTables);
router.post("/", authMiddleware, TableController.createTable);
router.put("/:id", authMiddleware, TableController.updateTable);
router.put("/:id/status", authMiddleware, TableController.updateStatus);
export default router;