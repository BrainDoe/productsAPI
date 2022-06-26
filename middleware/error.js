const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
   
  if(err.code === 11000) {
    const message = 'A user with this email address already exists. Please try another email address';

    error = new Error(message, 409);
  }

  if(err.name === 'ValidationError') {
    const message = Object.values(err.message).map(value => value.message);
    error = new Error(message, 400);
  }

  if(err.name === 'JsonWebTokenError') {
    const message = 'Invalid Token. Please login again';
    error = new Error(message, 401);
  }

  if(err.name === 'TokenExpiredError') {
    const message = 'Your token has expired. Please login again';
    error = new Error(message, 401);
  }

  res.status(error.statusCode || 500).json({ 
    responseCode: '11',
    responseDescription: err.message || 'Something went wrong'
  })
}

module.exports = errorHandler;