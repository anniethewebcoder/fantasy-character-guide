const express = require("express");
const router = express.Router();

const {
  getCharacter,
  getAllCharacters,
  createCharacter,
} = require("./../controllers/character");

router.route("/").get(getAllCharacters).post(createCharacter);

module.exports = router;
