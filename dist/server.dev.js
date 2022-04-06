"use strict";

if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

var express = require("express");

var bodyParser = require("body-parser");

var indexRouter = require("./router/index.js");

var expressLayouts = require("express-ejs-layouts");

var app = express();
var port = process.env.PORT;
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.set("router");
app.use(expressLayouts);
app.use(express["static"]("public"));
app.use("/", indexRouter);
app.use(bodyParser.urlencoded({
  extended: true
}));

var mongoose = require('mongoose');

var db = process.env.DATABASE_URL;
mongoose.connect(db).then(function () {
  console.log("Connection to mongo database is successful");
})["catch"](function (err) {
  console.log(err);
});
var UserSchema = new mongoose.Schema({
  name: String,
  userEmail: String,
  password: String
});
var Users = mongoose.model("Users", UserSchema); // Users.find((err, result)=>{
//     console.log(result)
// })

app.post("/signIn", function (req, res) {
  var Fname = req.body.Fname;
  var Lname = req.body.Lname;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var userEmail = req.body.email;
  var confirmUserEmail = req.body.confirmEmail;
  var name = Fname + " " + Lname;

  if (password == confirmPassword && userEmail == confirmUserEmail) {
    var newUser = new Users({
      userEmail: userEmail,
      password: password,
      name: name
    });
    newUser.save();
    res.render("about", {
      name: name
    });
    console.log(newUser);
  } else {
    res.send("Sorry TryAgain with same email and password");
  }
});
app.listen(port, function () {
  console.log("Server started at port: " + port);
});