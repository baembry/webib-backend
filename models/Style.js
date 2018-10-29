const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema({
  userId: String,
  createdAt: { type: Date, expires: 60 * 60 * 48 },

  label: String,
  extends: String,
  primaryPersonFormatter: String,
  secondaryPersonFormatter: String,
  firstNameFormatter: String,
  middleNameFormatter: String,
  connector: String,
  pageFormatter: String,
  useEtAlAfter: Number,
  etAlThreshhold: Number,
  templates: {},
  sortBy: [],
  sortPersonList: String,
  styles: {}
});

const Style = mongoose.model("Style", styleSchema);

exports.Style = Style;
exports.styleSchema = styleSchema;
