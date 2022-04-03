"use strict";

var express = require("express");

var router = express.Router();
router.get("/", function (req, res) {
  res.render("home", {
    title: "Home"
  });
});
router.get("/login", function (req, res) {
  res.render("login", {
    title: "Login"
  });
});
router.get("/signIn", function (req, res) {
  res.render("signIn", {
    title: "Sign In"
  });
});
router.get("*", function (req, res) {
  res.render("404");
});
module.exports = router;