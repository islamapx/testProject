class AppError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.message = msg;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
class InternalServerError extends AppError {
  constructor(msg = "Internal Server Error") {
    super(msg, 500);
  }
}
class RouteNotFoundError extends AppError {
  constructor(msg = "Route Not Found") {
    super(msg, 404);
  }
}
class ValidationError extends AppError {
  constructor(msg = "Validation Error") {
    super(msg, 400);
  }
}

module.exports = {
  AppError,
  InternalServerError,
  RouteNotFoundError,
  ValidationError,
};
