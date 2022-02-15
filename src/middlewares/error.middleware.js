const errorMiddleware = (err, req, res, next) => {
  const status = err.status ?? 500;
  const message = err.message;

  res.status(status).json({
    success: false,
    error: [
      {
        status,
        message,
      },
    ],
    reponse: null,
  });

  next();
};

module.exports = errorMiddleware;
