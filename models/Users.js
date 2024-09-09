const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fulltName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["Admin"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
