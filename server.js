console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
    if (err) {
        console.log("ERROR:", err);
    } else {
        user = JSON.parse(data);
    }
});

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("views", "./views");
app.set("view engine", "ejs");

// Routes
app.get("/", function (req, res) {
    res.render("harid", { reja: "Non, Sut, Tuxum, Yog'urt" });
});

app.get("/author", function (req, res) {
    res.render("author", { user: user });
});

app.get("/doctor", function (req, res) {
    res.render("doctor", { 
        title: "Doctor Portfolio",
        user: user 
    });
});

app.post("/create-item", function (req, res) {
    console.log(req.body);
    const newItem = req.body.item;
    res.render("harid", { reja: `Yangi qo'shilgan: ${newItem}` });
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
    console.log(`The server is running successfully on port ${PORT}`);
});

require('./train');