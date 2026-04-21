console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const http = require("http");

// 1. Kirish kodlari
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");

// 3. Routing
app.get("/", function (req, res) {
    res.render("harid", { reja: "Non, Sut, Tuxum, Yog'urt" });
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