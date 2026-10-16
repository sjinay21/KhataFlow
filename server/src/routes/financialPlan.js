import express from 'express';
import {
  getModels,
  generateRecommendation,
  createPlan,
  getActivePlan,
  updatePlan,
  deletePlan
} from '../controllers/financialPlanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes below are protected

router.route('/')
  .post(createPlan)
  .get(getActivePlan);

router.get('/models', getModels);
router.post('/recommendations', generateRecommendation);

router.route('/:id')
  .put(updatePlan)
  .delete(deletePlan);

export default router;
