const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
const url = "mongodb+srv://qianwenpan:LpaU4z6r4Dxj4NjQ@cluster0.iyauopq.mongodb.net/todolist";
mongoose.connect(url,{useNewUrlParser: true}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

//useUnifiedTopology: true
const itemsSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model("Item", itemsSchema);


const listSchema = new mongoose.Schema({
    name : String,
    items : [itemsSchema]
});

const List = mongoose.model("list", listSchema);

app.get("/", (req, res) => {
    
    // let day = date.getDate();
    Item.find({}).then((items) => {
        res.render("list", {listTitle: "Today", itemList: items});
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
        
        newItem.save().then(() => {
            res.redirect("/");
        });
        
    }else{
       List.findOne({name: listName}).then((foundList) => {
        foundList.items.push(newItem);
        foundList.save().then(() => {
            res.redirect("/" + listName);
        })  
       })
    }   
})

app.post("/delete", (req, res)=> {
    const item_id = req.body.checkbox;
    const list = req.body.list;
    
    if(list === "Today"){
        Item.findByIdAndDelete(item_id).then(() => {
            res.redirect("/");
        }); //Item.findByIdAndDelete({_id: item_id}) xxxx 
        
    }else{
        List.updateOne({name: list}, {$pull: {items: {_id : new mongoose.Types.ObjectId(item_id) }}}).then(() => {
            res.redirect("/" + list);
        });   
    }
});

app.get("/:listName", (req, res) => {
    const listName = _.capitalize(req.params.listName);

    List.findOne({name : listName}).then((foundList) => {
        if(!foundList){
            List.create({name: listName, items: []}).then(() => {
                res.redirect("/" + listName);
            });
            
        }else{         
            res.render("list", {listTitle : foundList.name, itemList: foundList.items});   //listTitle : foundList.name 

        }
    })

})



app.listen(3000, () => {
    console.log("server is working")
})