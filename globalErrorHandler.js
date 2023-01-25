const { AppError, InternalServerError } = require("./appError");

module.exports = (err, req, res, next) => {
  //   let stack = err.stack.split(" at ")[1];
  //   console.error("🎃🎃 Error: " + err.message + " at " + stack, err);
  if (!(err instanceof AppError)) {
    console.log("Unknown Error", err);
    err = new InternalServerError();
  }

  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
