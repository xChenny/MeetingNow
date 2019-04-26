require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const routes = require("./routes");
const passport = require("passport");

const app = express();

// config
require("./config/passport")(passport);

// middleware functions
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// connect to db
const dbConnection = require("./db/connect");

routes(app);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
