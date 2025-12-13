import { Router } from "express";
import { addSweet, getAllSweets, updateSweet } from "./sweets.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireAdmin } from "../../middlewares/role.middleware";

const router = Router();

// Public
router.get("/", getAllSweets);

// Admin only
router.post("/", authMiddleware, requireAdmin, addSweet);
router.put("/:id", authMiddleware, requireAdmin, updateSweet);

export default router;
