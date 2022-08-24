exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? "We're sorry, but something went wrong. We know about this mistake now and are working to fix it."
        : message,
    });

  next();
};
