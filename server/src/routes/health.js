import express from 'express';

const router = express.Router();

/**
 * @route   GET /api/v1/health
 * @desc    Check server health
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'API is running',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }
  });
});

export default router;
