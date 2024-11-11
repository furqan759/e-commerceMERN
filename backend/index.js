const express = require("express");
require("./db/config");
console.log("jkjkjk");
const User = require("./db/User");
const app = express();

app.post("/register", (req, res) => {
  res.send("API WORKS!@!!!");
});

app.listen(5000);
