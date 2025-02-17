const express = require("express");
const router = express.Router();

const { goHome } = require("./../controllers/journal");

router.route("/").get(goHome);

module.exports = router;
