const mongoose = require("mongoose");

const JournalSchema = mongoose.Schema({});

module.exports = mongoose.model("Journal", JournalSchema);
