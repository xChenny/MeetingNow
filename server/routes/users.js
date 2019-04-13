const { Router } = require("express");
const { createUser, findUser } = require("../db/data/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = Router();

router.post("/register", async (req, res) => {
  try {
    const response = await createUser(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    // if it got here, then local authentication worked
    // now, we need to generate a new jwt token
    try {
      const { email } = req.body;
      const user = await findUser({ email });
      const { _id } = user.data;
      const token = jwt.sign({ _id, email }, "secretkey", {
        expiresIn: "1d"
      });
      res.json({ msg: "Here's your jwt token!", token });
    } catch (err) {
      console.log(err);
      res.status(400).json({ err });
    }
  }
);

module.exports = router;
