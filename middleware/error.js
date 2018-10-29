const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  transports: [new winston.transports.File({ filename: "errorLog.log" })]
});
module.exports = function(error, req, res, next) {
  //log error
  logger.log({
    level: "error",
    message: error.message
  });

  res.status(500).send("Internal server error.");
};
