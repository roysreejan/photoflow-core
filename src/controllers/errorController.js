module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // Show full error details in development
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // In production, show limited details
  if (process.env.NODE_ENV === 'production') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message || 'Something went wrong!',
    });
  }
};
