var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

var app = express();
app.use(cors());

const dburl = "mongodb://localhost:27017/signup-signin";

const connect = mongoose.connect(dburl);
connect.then(() => {
  console.log("connected correctly to server");
});

var signupRouter = require("./routes/signup");
var signinRouter = require("./routes/signin");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", signupRouter);
app.use("/signin", signinRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
