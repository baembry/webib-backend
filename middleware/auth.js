const jwt = require("jsonwebtoken"),
  config = require("config"),
  { User } = require("../models/User");

// function auth(req, res, next) {
//   const token = req.header("x-auth-token");
//   if (!token) return res.status(401).send("Please Login");

//   try {
//     const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
//     //this is passed to the next callback and used to get user info
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send("Please login.");
//   }
// }

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
