require("dotenv").config();

const express = require("express");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const routes = require("./routes");

const app = express();

// middleware functions
app.use(morgan("dev"));
app.use(bodyParser.raw());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// connect to db
const dbConnection = require("./db/connect");

routes(app);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
