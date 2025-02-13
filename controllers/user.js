const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnuthenticatedError } = require("./../errors");

const register = async (req, res) => {};

const login = async (req, res) => {};

module.exports = { register, login };
