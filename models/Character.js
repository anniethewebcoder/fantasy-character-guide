const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide character name."],
      maxlength: 50,
    },
    age: {
      type: Number,
      required: [true, "Please provide character age."],
      min: 1,
      max: 9999,
    },
    species: {
      type: String,
      required: [true, "Please provide character speicies."],
      maxlength: 50,
    },
    classes: {
      type: String,
      required: [true, "Please provide character class."],
      maxlength: 50,
    },
    backgrounds: {
      type: String,
      required: [true, "Please provide character background."],
      maxlength: 50,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Character", CharacterSchema);
