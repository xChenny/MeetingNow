const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createRoom } = require("../db/data/room");
const uuidv4 = require("uuid/v4");

/**
 * Test route to check if jwt auth is working.
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Welcome" });
  }
);

/**
 * Create a new room
 */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // TODO: I need to also add the current user to the room
      const response = await createRoom(req.body);
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

router.post("/join-room", (req, res) => {
  // TODO: Add user route
  const { roomId, userId } = req.body;
});

module.exports = router;
