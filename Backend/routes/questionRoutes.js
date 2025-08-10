import express from 'express';
import { protect } from "../middlewares/authMiddleware.js";
import { togglePinQuestion, updateQuestionNote, addQuestionToSession } from '../controllers/questionsController.js';

const router = express.Router();

router.post('/add', protect, addQuestionToSession);
router.post('/:id/pin', protect, togglePinQuestion);
router.post('/:id/note', protect, updateQuestionNote);

export default router;