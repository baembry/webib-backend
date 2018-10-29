const express = require("express"),
  router = express.Router(),
  { Style } = require("../models/Style.js"),
  auth = require("../middleware/auth"),
  tryCatch = require("../middleware/tryCatch");

router.get(
  "/",
  auth,
  tryCatch(async function(req, res) {
    const userId = req.user._id;

    const styles = await Style.find({ userId: userId });
    res.send(styles);
  })
);

router.post(
  "/",
  auth,
  tryCatch(async (req, res) => {
    if (!req.user) {
      return res.status(410).send("Unauthorized");
    }
    const style = req.body;
    style.userId = req.user._id;
    let date = null;
    if (req.user.createdAt) {
      date = new Date();
    }
    style.createdAt = date;

    const newStyle = await Style.create(style);
    res.status(200).send(newStyle);
  })
);

router.put(
  "/:id",
  auth,
  tryCatch(async (req, res) => {
    if (!req.user) {
      return res.status(410).send("Unauthorized");
    }
    let style = req.body;

    const updatedStyle = await Style.findByIdAndUpdate(req.params.id, style);
    res.send(updatedStyle);
  })
);

router.get(
  "/:id",
  tryCatch(async (req, res) => {
    const style = await Style.findById(req.params.id);
    res.send(style);
  })
);

router.delete(
  "/:id",
  auth,
  tryCatch(async (req, res) => {
    if (!req.user) {
      return res.status(410).send("Unauthorized");
    }

    await Style.findByIdAndRemove(req.params.id);
    res.send("Style Deleted from DB");
  })
);

module.exports = router;
