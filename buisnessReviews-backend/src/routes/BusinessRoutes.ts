// src/routes/BusinessRoutes.ts

import { Router } from "express";
import {
  getBusiness,
  getBusinessById,
  createBusiness,
} from "../controllers/buisnessController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

// Define your routes
router.get("/businesses", getBusiness);
router.get("/:id", getBusinessById);
router.post("/create", verifyToken, createBusiness);

export default router;
