const jwt = require("jsonwebtoken"),
  config = require("config"),
  { User } = require("../models/User");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) req.user = false;

  try {
    const userId = jwt.verify(token, config.get("jwtPrivateKey"));
    const user = await User.findById(userId);
    //this is passed to the next callback and used to get user info
    req.user = user;
    next();
  } catch (ex) {
    req.user = false;
    next();
  }
}

module.exports = auth;
