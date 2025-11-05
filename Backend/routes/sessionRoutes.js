import express from "express";
import {
  createSession,
  getMySession,
  getSessionById,
  deleteSession,
  
} from "../controllers/sessionController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySession);
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSession);

export default router;