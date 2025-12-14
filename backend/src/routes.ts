import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes";
import sweetsRoutes from "./modules/sweets/sweets.routes";
import inventoryRoutes from "./modules/inventory/inventory.routes";

const router = Router();

/*
 ===============================
 Authentication Routes
 ===============================
 POST /api/auth/register
 POST /api/auth/login
*/
router.use("/auth", authRoutes);

/*
 ===============================
 Sweets Routes (CRUD + Search)
 ===============================
 POST   /api/sweets        (Admin)
 GET    /api/sweets        (Protected)
 GET    /api/sweets/search (Protected)
 PUT    /api/sweets/:id    (Admin)
 DELETE /api/sweets/:id    (Admin)
*/
router.use("/sweets", sweetsRoutes);

/*
 ===============================
 Inventory Routes
 ===============================
 POST /api/sweets/:id/purchase (Protected)
 POST /api/sweets/:id/restock  (Admin)
*/
router.use("/sweets", inventoryRoutes);

export default router;
