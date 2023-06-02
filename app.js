const express = require("express");
const bodyParser = require("body-parser");
// const path = require('path');
let dayLists = ["eat"];
let workLists = ["work"];

const app = express();
app.set('view engine', 'ejs');

// app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);
   
    res.render("list", {listTitle: day, itemList: dayLists, action: "/"});
    
})

app.post("/", (req, res) => {
    
    let item = req.body.newItem;
    if(req.body.button === "Work"){
        workLists.push(item);
        res.redirect("/work");
    }else{
        dayLists.push(item);
        res.redirect("/");
    }
    
    
})

app.get("/work", (req, res) => {
    
    res.render("list", {listTitle: "Work", itemList: workLists, action: "/work"});
})
app.post("/work", (req, res) => {
    let item = req.body.newItem;
    workLists.push(item);
    res.redirect("/work");
})
app.listen(3000, function() {
    console.log("server is working")
})