/**
 * 404 Not Found Middleware
 * Catch-all for routes that do not exist.
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global Error Handler Middleware
 * Standardizes API error responses and hides stack traces in production.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);
    if (statusCode === 500) {
      console.error(err.stack);
    }
  }

  res.status(statusCode).json({
    success: false,
    error: err.message,
    details: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
