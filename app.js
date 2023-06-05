const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemsSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model("Item", itemsSchema);
;


const dayLists = [];
const workLists = [];

app.get("/", (req, res) => {
    
    let day = date.getDate();

    
    Item.find({}).then((items)=> {
        res.render("list", {listTitle: day, itemList: items, action: "/"});
    })

    
    
})

app.post("/", (req, res) => {
    
    let item = req.body.newItem;
    Item.create({name : item}).then(() => { console.log("saved")});
    res.redirect("/");
    
    
    
})

app.get("/work", (req, res) => {
    
    res.render("list", {listTitle: "Work", itemList: workLists, action: "/work"});
})

app.listen(3000, () => {
    console.log("server is working")
})