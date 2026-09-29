import express from 'express';
import { getCityEstimates } from '../controllers/financialPlanController.js';

const router = express.Router();

router.get('/', getCityEstimates);

export default router;
