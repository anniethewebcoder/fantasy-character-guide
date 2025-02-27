const Journal = require("./../models/Journal");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("./../errors");

const getAllEntries = async (req, res) => {
  const entries = await Journal.find({
    characterBy: req.params.cid,
  }).sort("createdAt");

  res.status(StatusCodes.OK).json({
    entries,
    count: entries.length,
  });
};

const createEntry = async (req, res) => {
  req.body.characterBy = req.params.cid;

  const entry = await Journal.create(req.body);

  res.status(StatusCodes.CREATED).json({ entry });
};

const getEntry = async (req, res) => {
  const {
    params: { cid: characterId, id: entryId },
  } = req;

  const entry = await Journal.findOne({
    _id: entryId,
    characterBy: characterId,
  });

  if (!entry) {
    throw new NotFoundError("No entry with id: ${entryId}");
  }

  res.status(StatusCodes.OK).json({ entry });
};

const updateEntry = async (req, res) => {};

const deleteEntry = async (req, res) => {};

module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
};
