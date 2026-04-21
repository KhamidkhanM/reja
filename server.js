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
app.set("view engine", "ejs");
app.set("views", "./views");

// 3. Routing
// 4. Routing
app.get("/hello", function (req, res) {
    res.send("<h1>Hello, World by Me</h1>");
});

app.get("/sovgalar", function (req, res) {
    res.send("<h1>Siz sovgalar sahifasidasiz</h1>");
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
    console.log(` The server is running successfully on port ${PORT}`);
});