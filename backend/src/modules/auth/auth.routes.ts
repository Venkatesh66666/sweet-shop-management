import { Router } from "express";
import { register, login } from "./auth.controller";

const router = Router();

/*
 Auth Routes
*/
router.post("/register", register);
router.post("/login", login);
import { authenticate } from "../../middlewares/auth.middleware";

router.get("/protected", authenticate, (_req, res) => {
  res.status(200).json({ message: "Access granted" });
});

export default router;
