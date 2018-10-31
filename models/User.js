const mongoose = require("mongoose"),
  config = require("config"),
  jwt = require("jsonwebtoken"),
  Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    sparse: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 60 * 60 * 48
  }
});

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(50)
      .required(),
    createdAt: Joi.allow()
  };
  return Joi.validate(user, schema);
}

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
};

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;
