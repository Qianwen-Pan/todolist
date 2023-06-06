const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
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
    Item.find({}).then((items) => {
        res.render("list", {listTitle: "Today", itemList: items, action: "/"});
    })
    
})

app.post("/", (req, res) => {
    
    const item = req.body.newItem;
    const listName = req.body.button;
    // console.log(listName);

    const newItem = new Item({
        name: item
    });

    if(listName === "Today"){
        
        newItem.save();
        res.redirect("/");
    }else{
       List.findOne({name: listName}).then((foundList) => {
        foundList.items.push(newItem);
        foundList.save();
        res.redirect("/" + listName);
       })
    }   
})

app.post("/delete", (req, res)=> {
    const item_id = req.body.checkbox;
    const list = req.body.list;
    
    if(list === "Today"){
        Item.findByIdAndDelete({_id : item_id}).then(() => console.log("deleted in Today list"));
        res.redirect("/");
    }else{
        List.updateOne({name: list}, {$pull: {items: {_id : new mongoose.Types.ObjectId(item_id) }}}).then(() => console.log("deleted"));
        res.redirect("/" + list);
    }
    
    
});

app.get("/:listName", (req, res) => {
    const listName = req.params.listName;

    List.findOne({name : listName}).then((foundList) => {
        if(!foundList){
            List.create({name: listName, items: []}).then(() => console.log("list crated"));
            res.redirect("/" + listName);
        }else{         
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