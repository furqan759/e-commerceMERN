const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject(); // To remove password in response data
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password"); // remove password in response data
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "Please Enter All Fields" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.listen(5000);
