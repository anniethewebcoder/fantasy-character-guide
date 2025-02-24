const express = require("express");
const router = express.Router();

const { getAllQuestions } = require("./../controllers/questions");

router.route("/").get(getAllQuestions);

module.exports = router;
