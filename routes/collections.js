const express = require("express"),
  mongoose = require("mongoose"),
  router = express.Router(),
  { Collection } = require("../models/Collection.js"),
  auth = require("../middleware/auth"),
  tryCatch = require("../middleware/tryCatch");

router.get(
  "/",
  auth,
  tryCatch(async function(req, res) {
    var collections = await Collection.find({ userId: req.user._id }).populate(
      "entries"
    );
    res.send(collections);
  })
);

// router.get("/:id", async function(req, res) {
//   try {
//     var collection = await Collection.findById(req.params.id).populate(
//       "entries"
//     );
//     res.send(collection);
//   } catch (error) {
//     res.send(error);
//   }
// });

router.post(
  "/",
  auth,
  tryCatch(async (req, res, next) => {
    let date = null;
    if (req.user.createdAt) {
      date = new Date();
    }
    if (!req.user) {
      return res.status(410).send("Unauthorized");
    }
    const collection = {
      userId: req.body.userId,
      name: req.body.name,
      createdAt: date
    };
    const newCollection = await Collection.create(collection);
    res.send(newCollection);
  })
);

router.put(
  "/:id",
  auth,
  tryCatch(async (req, res) => {
    if (!req.user) {
      return res.status(410).send("Unauthorized");
    }
    const add = req.body.add;
    if (add) {
      await Collection.update(
        { _id: req.params.id },
        { $addToSet: { entries: req.body.entryId } }
      );
    } else {
      await Collection.update(
        { _id: req.params.id },
        { $pull: { entries: req.body.entryId } }
      );
    }
    res.status(200).send("Collection updated");
  })
);

router.delete(
  "/:id",
  auth,
  tryCatch(async (req, res) => {
    if (!req.user) {
      return res.status(410).send("Unauthorized");
    }
    const deleted = await Collection.findByIdAndRemove(req.params.id);
    res.send(deleted);
  })
);

module.exports = router;
