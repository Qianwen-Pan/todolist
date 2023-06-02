const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');


const app = express();
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res) => {
    var today = new Date();
    var currentDay = today.getDay();
    var day = "";
    switch (currentDay){
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 0:
            day = "Sunday";
            break;
        default:
            console.log("Error: current day is " + currentDay);
    }
    res.render("list", {day: day});
    
    
    
})
app.listen(3000, function() {
    console.log("server is working")
})