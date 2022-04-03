if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const express = require("express")
const bodyParser = require("body-parser")
const indexRouter = require("./router/index.js")
const expressLayouts = require("express-ejs-layouts")
const app = express()
const port = process.env.PORT;

app.set("view engine", "ejs")
app.set("views", __dirname+"/views")
app.set("layout", "layouts/layout")
app.set("router")


app.use(expressLayouts)
app.use(express.static("public"))
app.use("/", indexRouter)



app.use(bodyParser.urlencoded({extended:true}))
const mongoose = require('mongoose');

const db = process.env.DATABASE_URL

mongoose.connect(db).then(()=>{
    console.log("Connection Successful")
}).catch(err =>{console.log(err)})


const UserSchema = new mongoose.Schema({
    name: String,
    userEmail: String,
    password:String,
}) 
const Users = mongoose.model("Users", UserSchema)

// Users.find((err, result)=>{
//     console.log(result)
// })


app.post("/", (req,res)=>{
    var name = req.body.name
    var password = req.body.password
    var userEmail = req.body.email

    const newUser = new Users({
        userEmail: userEmail,
        password:password,
        name:name,
    })

    newUser.save()
    res.render("about")
    console.log(newUser)
})


app.listen(port, ()=>{
    console.log("Server started at port " + port)
})