import { Router } from "express";
import { register, login } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", authMiddleware, (req, res) => {
  return res.status(401).json({ message: "Unauthorized" });
});

export default router;
