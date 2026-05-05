export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((item) => item.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID",
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
  });
};
