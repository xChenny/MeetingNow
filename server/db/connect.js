const mongoose = require("mongoose");

const db = "test";
const host = "localhost";
const connectionString = `mongodb://${host}/${db}`;

mongoose.connect(connectionString);

const dbConnection = mongoose.connection;

dbConnection.on(
  "error",
  console.error.bind(console, "Something wrong! Connection error:")
);

dbConnection.once("open", function() {
  console.log("Opened connection");
});

module.exports = dbConnection;
