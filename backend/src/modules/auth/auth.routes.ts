import { Router } from "express";
import { register, login } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireAdmin } from "../../middlewares/role.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// JWT protected route
router.get("/protected", authMiddleware, (req, res) => {
  return res.status(401).json({ message: "Unauthorized" });
});

// Admin-only route
router.get("/admin", authMiddleware, requireAdmin, (req, res) => {
  return res.status(403).json({ message: "Access denied" });
});

export default router;
