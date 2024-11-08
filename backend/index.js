const express = require("express");
require("./db/config");
const User = require("./db/User");
const app = express();

app.post("/register", (req, res) => {
  res.send("API WORKS!@!!!");
});

app.listen(5000);
