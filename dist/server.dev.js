"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var indexRouter = require("./router/index.js");

var expressLayouts = require("express-ejs-layouts");

var app = express();
var port = 3000;
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

var db = "mongodb+srv://Jastagar:jastagarbrarmks123@cluster0.vishy.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(db).then(function () {
  console.log("Connection Successful");
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

app.post("/", function (req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var userEmail = req.body.email;
  var semester = req.body.semester;
  var newUser = new Users({
    userEmail: userEmail,
    password: password,
    name: name,
    semester: semester
  });
  newUser.save();
  res.send("Thank You");
  console.log(newUser);
});
app.listen(port, function () {
  console.log("Server started at port " + port);
});