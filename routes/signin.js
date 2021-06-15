var express = require("express");
var router = express.Router();
const User = require("../schema/signup");

router.get("/", function (req, res, next) {
  res.send("you are at signin");
});

router.post("/", (req, res, next) => {
  console.log(req.body);

  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) res.json({ message: err });
    if (user) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) res.status(400).json({ message: err });
        res.send({ isMatch, user, message: "sign in successful" });
      });
    } else {
      res.status(400).json({ message: "user not found" });
    }
  });
});

module.exports = router;
