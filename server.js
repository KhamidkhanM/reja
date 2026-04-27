console.log("Server is starting...");

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

let rejaList = [];

// 1: Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3: Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
app.post("/create-item", (req, res) => {
    const newItem = req.body.item;
    rejaList.push(newItem);
    res.render("reja", { user: user, rejaList: rejaList });
});

app.post("/delete-all", (req, res) => {
    rejaList = [];
    res.render("reja", { user: user, rejaList: rejaList });
});

app.get("/", function (req, res) {
    res.render("reja", { user: user, rejaList: rejaList });
});

app.post("/delete-item", (req, res) => {
    const item = req.body.item;
    rejaList = rejaList.filter(i => i !== item);
    res.render("reja", { user: user, rejaList: rejaList });
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
    console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
});