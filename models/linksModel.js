// const mongoose = require("mongoose");

// const linkSchema = new mongoose.Schema({
//   links: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Link",
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Link = mongoose.model("Link", linkSchema);

// module.exports = Link;

const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
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
