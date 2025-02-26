const express = require("express");
const router = express.Router();

const {
  getCharacter,
  getAllCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("./../controllers/character");

router.route("/").get(getAllCharacters).post(createCharacter);
router
  .route("/:id")
  .get(getCharacter)
  .patch(updateCharacter)
  .delete(deleteCharacter);

module.exports = router;
