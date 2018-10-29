const mongoose = require("mongoose"),
  { entrySchema } = require("./Entry.js");

const collectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    maxLength: 30,
    required: true
  },
  entries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Entry" }],
  createdAt: { type: Date, expires: 60 * 60 * 48 }
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports.Collection = Collection;
exports.collectionSchema = collectionSchema;
