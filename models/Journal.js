const mongoose = require("mongoose");

const JournalSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title."],
      minlength: 3,
      maxlength: 999,
    },
    entry: {
      type: String,
      required: [true, "Please provide entry."],
      minlength: 1,
    },
    characterBy: {
      type: mongoose.Types.ObjectId,
      ref: "Character",
      required: [true, "Please provide character."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", JournalSchema);
