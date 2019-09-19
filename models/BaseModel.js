const mongoose = require("mongoose");
const config = require("../config.js");

const conn = mongoose.createConnection(config.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

conn.on("error", err => {
  if (err) throw err;
});

conn.once("open", _ => {
  console.log(`MongoDB connected successfully`);
});

module.exports = conn;
const logDebug = true;

mongoose.set("debug", logDebug);
