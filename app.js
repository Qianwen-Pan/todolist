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

const listSchema = new mongoose.Schema({
    name : String,
    items : [itemsSchema]
});

const List = mongoose.model("list", listSchema);

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

app.post("/delete", (req, res)=> {
    const item_id = req.body.checkbox;
    console.log(item_id);
    Item.findByIdAndDelete({_id : item_id}).then(() => console.log("deleted"));
    res.redirect("/");
});

app.get("/:listName", (req, res) => {
    const listName = req.params.listName;
    console.log(listName);
    List.findOne({name : listName}).then((foundList) => {
        if(!foundList){
            //create new list
            List.create({name: listName, items: []}).then(() => console.log("list crated"));
            res.redirect("/" + listName);
        }else{
            //query
            console.log(foundList);
            console.log(foundList.items);
            res.render("list", {listTitle : listName, itemList: foundList.items});

        }
    })

})

app.get("/work", (req, res) => {
    
    res.render("list", {listTitle: "Work", itemList: workLists, action: "/work"});
})

app.listen(3000, () => {
    console.log("server is working")
})