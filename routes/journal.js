const express = require("express");
const router = express.Router();

const {
  getEntry,
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} = require("./../controllers/journal");

router.route("/:cid").get(getAllEntries).post(createEntry);
router.route("/:cid/:id").get(getEntry).patch(updateEntry).delete(deleteEntry);

module.exports = router;
