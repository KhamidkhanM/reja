console.log("Server is starting...");

const express = require("express");
const app = express();
const fs = require("fs");

// MongoDB connect 
const db = require("./server").db("Reja");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
    if (err) {
        console.log("ERROR:", err);
    } else {
        user = JSON.parse(data);
    }
});

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
   db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    if (err) {
        console.log(err);
        res.end("something went wrong");
    } else {
        res.redirect("/");
    }
   });
});

app.get("/", function (req, res) {
    console.log("user entered /");
    db.collection("plans")
    .find()
    .toArray((err, data) => {
        if (err) {
            console.log(err);
            res.end("something went wrong");
        } else {
            console.log(data);
            res.render("reja", { items: data });
        }
    });
});

app.get("/author", function (req, res) {
    res.render("author", { user: user });
});

module.exports = app;