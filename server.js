const express = require("express")
const {MongoClient} = require("mongodb")
const app = express()
const port = 3000;
const bodyParser = require("body-parser")


// MongoDB
async function main() {
	const uri = "mongodb+srv://Jastagar:jastagarbrarmks123@cluster0.vishy.mongodb.net/test"
    const client = new MongoClient(uri);
    await client.connect();

    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.use(express.static("public"))

app.set("view engine", "ejs")

app.get("/", function(req,res){
    res.render("index", {data: "This is the data from the backend"});
})
app.get("/:pageName", function(req,res){
    res.render("about", {pageName: req.params.pageName});
})
app.get("*", function(req,res){
    res.render("404",);
})

app.listen(port, ()=>{
    console.log("Server started at port " + port)
})