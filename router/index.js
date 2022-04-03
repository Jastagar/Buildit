const express = require("express")
const router  = express.Router()

router.get("/", function(req,res){
    res.render("index", {data: "This is the data from the backend"});
})
router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("*", function(req,res){
    res.render("404");
})

module.exports = router