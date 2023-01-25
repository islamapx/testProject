const { ValidationError } = require("./appError");

exports.validateReqField = (validationSchema, reqField) => (req, res, next) => {
  let result = validationSchema.validate(req[reqField]);
  if (result.error)
    return next(
      new ValidationError(result.error.details.map((e) => e.message).join(", "))
    );
  req[reqField] = result.value;
  next();
};

exports.ReqFields = {
  body: "body",
  query: "query",
  params: "params",
};
