const CustomAPIError = require("./customapi");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./notfound");
const BadRequestError = require("./badrequest");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
