// error handler for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`🎃🎃 UnCaught exception thrown${err.message}`);
});

const express = require("express");
const globalErrorHandler = require("./globalErrorHandler");
const Joi = require("joi");

const { validateReqField, ReqFields } = require("./validation");
const { RouteNotFoundError } = require("./appError");

const catchAsync = (fn) => (req, res, next) => {
  return fn(req, res, next).catch(next);
};

const app = express();
app.use(express.json());

const validationSchema = Joi.object({
  id: Joi.string().required(),
});

// reference error
app.post("/exception", (req, res, next) => {
  dassd;
  res.json({ status: "ok" });
});

// type error from db for example
app.post("/number", (req, res, next) => {
  const { id } = req.body;
  // threw error if it is number
  if (typeof id === "number") throw new Error("id must be a string");
  res.json({ status: "ok" });
});

app.post(
  "/numberValidated",
  validateReqField(validationSchema, ReqFields.body),
  (req, res, next) => {
    const { id } = req.body;
    // threw error if it is number
    if (typeof id === "number") throw new Error("id must be a string");
    res.json({ status: "ok" });
  }
);

app.post("/async", async (req, res, next) => {
  await Promise.reject("error");
  res.json({ status: "ok" });
});

app.post("/tryCatch", async (req, res, next) => {
  try {
    await Promise.reject("error");
    res.json({ status: "ok" });
  } catch (e) {
    next(e);
  }
});

app.post(
  "/cached",
  catchAsync(async (req, res, next) => {
    await Promise.reject("error");
    res.json({ status: "ok" });
  })
);

app.use((req, res, next) => {
  next(new RouteNotFoundError());
});

app.use(globalErrorHandler);

app.listen(3000, () => console.log("server is running "));

// error handler for unHandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    `🎃🎃 UnHandledRejection on ${promise} because ${reason}`,
    reason
  );
});
