//install mongodb, mongoose
const express = require("express"),
  winston = require("winston"), //error logger
  app = express(),
  mongoose = require("mongoose"),
  config = require("config"),
  error = require("./middleware/error"),
  collectionsRoutes = require("./routes/collections"),
  entriesRoutes = require("./routes/entries"),
  allEntriesRoutes = require("./routes/allEntries"),
  usersRoutes = require("./routes/users"),
  authRoutes = require("./routes/auth"),
  stylesRoutes = require("./routes/styles");

const logger = winston.createLogger({
  level: "error",
  transports: [new winston.transports.File({ filename: "errorLog.log" })]
});

process.on("uncaughtException", ex => {
  logger.log({
    level: "error",
    message: error.message
  });
  process.exit(1);
});
process.on("uncaughtRejection", ex => {
  logger.log({
    level: "error",
    message: error.message
  });
  process.exit(1);
});
//set in terminal with export webib_privateKey=...
if (!config.get("jwtPrivateKey")) {
  console.error("Fatal ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
const options = {
  // sets how many times to try reconnecting
  reconnectTries: Number.MAX_VALUE,
  // sets the delay between every retry (milliseconds)
  reconnectInterval: 1000,
  useNewUrlParser: true
};

mongoose
  .connect(
    //"mongodb://localhost:27017/webib",
    config.get("db"),
    options
  )
  .then(() => console.log("Connected to mongodb"))
  .catch(err => console.log("Could not connect to mongodb...", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/collections", collectionsRoutes);
app.use("/entries", entriesRoutes);
app.use("/all-entries", allEntriesRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/styles", stylesRoutes);

//error handler
app.use(error);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
