const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  links: [
    {
      key: String,
      value: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
