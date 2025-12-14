import { Router } from "express";
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} from "./sweets.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/*
 POST /api/sweets
 Admin only
*/
router.post("/", authenticate, authorize("ADMIN"), createSweet);

/*
 GET /api/sweets
 Protected
*/
router.get("/", getAllSweets);


/*
 GET /api/sweets/search
 Protected
*/
router.get("/search", authenticate, searchSweets);

/*
 PUT /api/sweets/:id
 Admin only
*/
router.put("/:id", authenticate, authorize("ADMIN"), updateSweet);

/*
 DELETE /api/sweets/:id
 Admin only
*/
router.delete("/:id", authenticate, authorize("ADMIN"), deleteSweet);

export default router;
