
console.log("Server is starting...");

const express = require("express");
const app = express();



// MongoDB connect 
const db = require("./server").db();


// 1: Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3: Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code

app.post("/create-item", (req, res) => {
   console.log(req.body);
   const new_reja = req.body.reja;
   db.collection("plans").insertOne({ reja: new_reja},(err,data) => {
    if(err) {
        console.log("somethin went wrong");
    } else {
        res.end("successfully added");
    }
   });
});


app.post("/delete-all", (req, res) => {
    rejaList = [];
    res.render("reja", { user: user, rejaList: rejaList });
});

app.get("/", function (req, res) {
    console.log("user entered /create-item");
    db.collection("plans")
    .find()
    .toArray((err,data) => {
        if (err) {
            console.log(err);
            res.end("something went wrong");
        } else{
            console.log(data);
            res.render("reja", {items: data });
        }
    })
});

app.post("/delete-item", (req, res) => {
    const item = req.body.item;
    rejaList = rejaList.filter(i => i !== item);
    res.render("reja", { user: user, rejaList: rejaList });
});

module.exports = app;