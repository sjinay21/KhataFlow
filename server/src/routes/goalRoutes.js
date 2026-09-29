import express from 'express';
import {
  getGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal
} from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getGoals)
  .post(protect, createGoal);

router.route('/:id')
  .get(protect, getGoalById)
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

export default router;
