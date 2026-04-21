console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const http = require("http");

// 1. Kirish kodlari
// 1.
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. View engine va views papkasini sozlash
// 3.
app.set("views", "./views");
app.set("view engine", "ejs");


// 3. Routing
// 4. Routing
app.post("/create-item", function (req, res) {
    console.log(req.body);
    res.json({ test: "success" });
});

app.get("/", function (req, res) {
    res.send("harid");
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
    console.log(` The server is running successfully on port ${PORT}`);
});