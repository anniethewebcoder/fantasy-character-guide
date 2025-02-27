const Journal = require("./../models/Journal");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("./../errors");

const getAllEntries = async (req, res) => {
  const entries = await Journal.find({
    createdBy: req.user.userId,
  });
};

const createEntry = async (req, res) => {};

const getEntry = async (req, res) => {};

const updateEntry = async (req, res) => {};

const deleteEntry = async (req, res) => {};

module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
};
