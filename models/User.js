const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide your first name."],
    minlenghth: 3,
    maxlength: 50,
  },
  lastname: {
    type: String,
    required: [true, "Please provide your last name."],
    minlenghth: 3,
    maxlength: 50,
  },
  username: {
    type: String,
    required: [true, "Please provide your username"],
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide your email address.",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password."],
    minlength: 8,
  },
});

module.exports = mongoose.model("User", UserSchema);
