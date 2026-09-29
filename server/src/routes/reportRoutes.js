import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getExpenseReports } from '../controllers/reportController.js';

const router = express.Router();

router.get('/expenses', protect, getExpenseReports);

export default router;
