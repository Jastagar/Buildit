if(process.env.NODE_ENV != "production"){
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
    console.log("Connection to mongo database is successful")
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


app.post("/signIn", (req,res)=>{
    var Fname = req.body.Fname
    var Lname = req.body.Lname
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword
    var userEmail = req.body.email
    var confirmUserEmail = req.body.confirmEmail
    var name = Fname + " " + Lname;
    



    if(password == confirmPassword && userEmail == confirmUserEmail){
        const newUser = new Users({
            userEmail: userEmail,
            password:password,
            name: name,
        })
        newUser.save()
        res.render("about", {name:name})
        console.log(newUser)
    }else{
        res.send("Sorry TryAgain with same email and password")
    }

    
})


app.listen(port, ()=>{
    console.log("Server started at port: " + port)
})