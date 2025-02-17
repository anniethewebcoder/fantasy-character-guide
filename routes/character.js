const express = require("express");
const router = express.Router();

const { getCharacter } = require("./../controllers/characters");

router.route("/").get(getCharacter);

module.exports = router;
