const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  entryType: String,
  authors: [
    {
      prefix: String,

      firstName: {
        type: String,
        maxLength: 30
      },

      middleName: {
        type: String,
        maxLength: 30
      },

      lastName: {
        type: String,
        maxLength: 30
      },

      postNom: String
    }
  ],

  title: {
    type: String
  },
  edition: String,
  journal: String,
  volume: String,
  numberOfVolumes: String,
  issue: String,
  volumeTitle: String,
  seriesTitle: String,
  startPage: String,
  endPage: String,
  pageRange: String,
  editors: [
    {
      prefix: String,

      firstName: {
        type: String,
        maxLength: 30
      },

      middleName: {
        type: String
      },

      lastName: {
        type: String,
        maxLength: 30
      },

      postNom: String
    }
  ],

  translators: [
    {
      prefix: String,

      firstName: {
        type: String,
        maxLength: 30
      },

      middleName: {
        type: String
      },

      lastName: {
        type: String,
        maxLength: 30
      },

      postNom: String
    }
  ],
  publisher: String,
  year: String,
  city: String,
  retrievedFrom: String,
  notes: String,
  abstract: String
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports.Entry = Entry;
exports.entrySchema = entrySchema;
