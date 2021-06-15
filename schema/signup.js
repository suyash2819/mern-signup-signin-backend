const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next();

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next();
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (userPassword, cb) {
  bcrypt.compare(userPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
