const express = require("express");
const router = express.Router();
const { add: addMember } = require("../db/data/member");

router.get("/", (req, res) => {
  res.send("hello");
});

// create a new room
router.post("/create", async (req, res) => {
  const params = req.body;
  try {
    await create(params);
    res.send("success");
  } catch (err) {
    res.send("unsuccessful");
  }
});

// create a new member and add them to the room
router.post("/add-member", async (req, res) => {
  // this code supports adding multiple members, but
  // probably just better to add one at a time.
  const { body } = req;
  let success = true;
  // insert every object inside of the params
  for (let newMember of body) {
    try {
      await addMember(newMember);
    } catch (err) {
      success = false;
      continue;
    }
  }

  if (success) {
    //TODO: send back useful information like {roomId, members}
    res.send("Member successfully added!");
  } else {
    res.send("Unsuccessful in adding member!");
  }
});

module.exports = router;
