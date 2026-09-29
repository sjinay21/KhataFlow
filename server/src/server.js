import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// OLD CODE: previous implementation preserved for project history.
// import healthRoutes from './routes/health.js';
// import authRoutes from './routes/auth.js';
// import financialPlanRoutes from './routes/financialPlan.js';
// import cityEstimateRoutes from './routes/cityEstimates.js';
// REASON FOR CHANGE: Adding expenseRoutes for Phase 5.
import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import financialPlanRoutes from './routes/financialPlan.js';
import cityEstimateRoutes from './routes/cityEstimates.js';
import expenseRoutes from './routes/expenseRoutes.js';
import reportRoutes from './routes/reportRoutes.js'; // Added for Phase 6
import goalRoutes from './routes/goalRoutes.js'; // Added for Phase 7

/*
Previous implementation:
import app from './app.js';
... (server starting logic)

Changed because:
Combined app.js into server.js to consolidate Express app setup and server initialization, as requested.
Reverted the API mount paths back to include '/api/v1' because removing it breaks frontend API requests (which explicitly call /api/v1/...).
*/

const app = express();

// Basic middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// API Routes
// OLD CODE: previous implementation preserved for project history.
// app.use('/api/v1', healthRoutes);
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/financial-plan', financialPlanRoutes);
// app.use('/api/v1/city-estimates', cityEstimateRoutes);
// REASON FOR CHANGE: Mounting Phase 5 expense routes and reverting user's removal of /api/v1 prefix.
app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/financialPlan', financialPlanRoutes);
app.use('/cityEstimates', cityEstimateRoutes);
app.use('/expenses', expenseRoutes);
app.use('/reports', reportRoutes); // Added for Phase 6
app.use('/goals', goalRoutes); // Added for Phase 7

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to Database
// Only connect if URI is defined to prevent crash during simple health check testing if MongoDB isn't running yet.
if (process.env.MONGODB_URI) {
  connectDB();
} else {
  console.log('MONGODB_URI is not defined, skipping database connection.');
}

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
