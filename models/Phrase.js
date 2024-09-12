const mongoose = require("mongoose");
const phraseSchema = new mongoose.Schema({
  feature: {
    type: String,
    required: true,
  },

  coin: {
    type: String,
    required: true,
  },

  phraseType: {
    type: String,
    required: true,
  },
  phrase: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Phrase = mongoose.model("Phrase", phraseSchema);
module.exports = Phrase;
