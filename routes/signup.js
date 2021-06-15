var express = require("express");
var router = express.Router();
const User = require("../schema/signup");

router.get("/", function (req, res, next) {
  res.send("you are at signup");
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  let user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user
    .save()
    .then(() => {
      res.send("user sign up completed");
    })
    .catch((err) => {
      if (err.code && err.code == 11000)
        res.status(400).json({ message: "username already exists" });
      else res.status(500).json({ message: err });
    });
});

module.exports = router;
