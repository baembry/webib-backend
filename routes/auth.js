const express = require("express"),
  bcrypt = require("bcryptjs"),
  router = express.Router(),
  tryCatch = require("../middleware/tryCatch"),
  { User } = require("../models/User.js");

router.post(
  "/",
  tryCatch(async (req, res) => {
    //make sure user is not already registered

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid)
      return res.status(400).send("Invalid username or password");

    //set payload of jwt   //npm install config, set config files, and export privateKey
    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send(token);
  })
);

module.exports = router;
