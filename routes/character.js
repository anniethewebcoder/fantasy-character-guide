const express = require("express");
const router = express.Router();

const {
  getCharacter,
  getAllCharacters,
} = require("./../controllers/character");

router.route("/").get(getAllCharacters);

module.exports = router;
