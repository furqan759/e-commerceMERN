const express = require("express");
require("./db/config");
console.log("jkjkjk");
const User = require("./db/User");
const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.listen(5000);
