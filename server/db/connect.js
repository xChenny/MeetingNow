const mongoose = require("mongoose");
const host = process.env.DATABASE_HOST || "localhost";
const db = process.env.DATABASE || "test";
const connectionString = `mongodb://${host}/${db}`;

console.log(`Connecting to DB at: "${connectionString}"`);

// connect to db
mongoose.connect(connectionString, { useNewUrlParser: true });

// grab db connection
const dbConnection = mongoose.connection;

// db event handling
dbConnection.on(
  "error",
  console.error.bind(console, "Something wrong! Connection error:")
);

dbConnection.once("open", function() {
  console.log("Opened connection to db");
});

module.exports = dbConnection;
