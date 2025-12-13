import { Router } from "express";
import { addSweet } from "./sweets.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireAdmin } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", authMiddleware, requireAdmin, addSweet);

export default router;
