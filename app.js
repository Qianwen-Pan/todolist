const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
    res.send("adfas");
})
app.listen(3000, function() {
    console.log("server is working")
})