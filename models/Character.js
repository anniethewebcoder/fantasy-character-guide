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
    class: {
      type: String,
      required: [true, "Please provide character class."],
      maxlength: 50,
    },
    background: {
      type: String,
      required: [true, "Please provide character background."],
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Character", CharacterSchema);
