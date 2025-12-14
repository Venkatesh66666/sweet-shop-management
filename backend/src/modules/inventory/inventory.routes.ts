import { Router } from "express";
import { purchaseSweet, restockSweet } from "./inventory.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/*
 POST /api/sweets/:id/purchase
 Protected – Any logged-in user
*/
router.post("/:id/purchase", authenticate, purchaseSweet);

/*
 POST /api/sweets/:id/restock
 Protected – Admin only
*/
router.post(
  "/:id/restock",
  authenticate,
  authorize("ADMIN"),
  restockSweet
);

export default router;
