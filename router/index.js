const express = require("express")
const router  = express.Router()

router.get("/", function(req,res){
    res.render("home", {title:"Home"});
})
router.get("/login",(req,res)=>{
    res.render("login", {title:"Login"})
})
router.get("/signIn",(req,res)=>{
    res.render("signIn", {title:"Sign In"})
})
router.get("*", function(req,res){
    res.render("404");
})

module.exports = router