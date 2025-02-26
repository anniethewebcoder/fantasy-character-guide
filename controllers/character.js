const Character = require("./../models/Character");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("./../errors");

const getAllCharacters = async (req, res) => {
  const characters = await Character.find({
    createdBy: req.user.userId,
  }).sort("createdAt");

  res.status(StatusCodes.OK).json({
    characters,
    count: characters.length,
  });
};

const getCharacter = async (req, res) => {};

const createCharacter = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const character = await Character.create(req.body);

  res.status(StatusCodes.CREATED).json({ character });
};

const updateCharacter = async (req, res) => {};

const deleteCharacter = async (req, res) => {};

module.exports = {
  getAllCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
