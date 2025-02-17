const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({});

module.exports = mongoose.model("Character", CharacterSchema);
