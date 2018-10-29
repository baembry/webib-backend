const express = require("express"),
  router = express.Router(),
  auth = require("../middleware/auth"),
  tryCatch = require("../middleware/tryCatch"),
  { Entry } = require("../models/Entry.js"),
  { Collection } = require("../models/Collection.js");

router.get(
  "/",
  auth,
  tryCatch(async function(req, res) {
    const entries = await Entry.find();
    res.send(entries);
  })
);

module.exports = router;
