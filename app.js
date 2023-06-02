const express = require("express");
const bodyParser = require("body-parser");
// const path = require('path');
let items = [];

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
   
    res.render("list", {kindOfDay: day, itemList: items});
    
})

app.post("/", (req, res) => {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})
app.listen(3000, function() {
    console.log("server is working")
})