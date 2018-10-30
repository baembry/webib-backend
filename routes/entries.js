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
    const entries = await Entry.find({ userId: req.user._id });
    res.send(entries);
  })
);

router.post(
  "/",
  auth,
  tryCatch(async (req, res) => {
    const { entry, collectionId } = req.body;
    if (!req.user) {
      return res.status(410).send("Unauthorized");
    }
    console.log("posting to entries...");
    entry.userId = req.user._id;
    entry.pageRange = entry.startPage
      ? entry.startPage + "-" + entry.endPage
      : null;
    const newEntry = await Entry.create(entry);
    console.log("new entry: ", newEntry);
    console.log("posting to collection...");
    let collection = null;
    if (collectionId !== undefined) {
      collection = await Collection.findById(collectionId);
      collection.entries.push(newEntry);
      collection.save();
    }
    res.status(200).send({ collection, newEntry });
  })
);

router.put(
  "/:id",
  auth,
  tryCatch(async (req, res) => {
    if (!req.user) {
      return res.status(410).send("Unauthorized");
    }
    let entry = req.body;
    entry.pageRange = entry.startPage + "-" + entry.endPage;
    const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body);
    res.send(updatedEntry);
  })
);

router.get(
  "/:id",
  tryCatch(async (req, res) => {
    const entry = await Entry.findById(req.params.id);
    res.send(entry);
  })
);

router.delete(
  "/:id",
  auth,
  tryCatch(async (req, res) => {
    if (!req.user) {
      return res.status(410).send("Unauthorized");
    }
    await Entry.findByIdAndRemove(req.params.id);
    res.send("Entry Deleted from DB");
  })
);

module.exports = router;
