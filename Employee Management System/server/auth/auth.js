const express = require("express");
const { check, validationResult } = require("express-validator");
const confiq = require("./../config");
const { userschema } = require("./../database connection/schema");
const { fetchuser } = require("./../middleware/fetchuser");
const router = express.Router();
const bcryt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = confiq.jwtsecret;
router.post(
  "/authenticate",
  [
    check("email").optional().isEmail(),
    check("password").optional().isLength({ min: 5 }),
    check("username").optional().isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const validate = async () => {
        if (req.body.username && req.body.password) {
          return await (
            await userschema()
          ).findOne({ username: req.body.username });
        }
        if (req.body.email && req.body.password) {
          return await (await userschema()).findOne({ email: req.body.email });
        }
      };
      const userdata = await validate();
      console.log(userdata);
      if (userdata) {
        const passwordmatching = await bcryt.compare(
          req.body.password,
          userdata.password
        );
        if (passwordmatching) {
          const token = jwt.sign({ _id: userdata._id }, jwtsecret);
          res.status(400).send({ token: token });
        } else {
          res.status(400).json("Enter correct password");
        }
      } else {
        res.status(400).json("try with correct credentials");
      }
    } catch (err) {
      console.error(err.message);
    }
  }
);
router.post("/authentication", fetchuser, async (req, res) => {
  try {
    const userid = req.users._id;
    console.log(userid);
    const userdata = await (await userschema())
      .findOne({ _id: userid })
      .select("-password");
    res.status(400).send({ userdata, msg: true });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
