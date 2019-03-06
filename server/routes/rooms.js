const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/create", (req, res) => {
  res.send("creating a room");
});

module.exports = router;
