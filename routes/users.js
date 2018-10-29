const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  tryCatch = require("../middleware/tryCatch"),
  { User, validate } = require("../models/User.js");

router.post(
  "/",
  tryCatch(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //make sure user is not already registered
    let user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(400).send("That username is already registered");

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      username: req.body.username,
      password: password,
      createdAt: req.body.createdAt
    });

    //generateAuthToken defined on userSchema
    const token = newUser.generateAuthToken();
    //header takes key/value pair
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(newUser.username);
  })
);

module.exports = router;
