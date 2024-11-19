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

app.get("/products", async (req, res) => {
  if (req) {
    let products = await Product.find();
    if (products) {
      res.send(products);
    } else {
      res.send({ result: "No Products Found" });
    }
  } else {
    res.send({ result: "Server Error!" });
  }
});

app.delete("/product/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req?.params?.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "Deletion Failed" });
  }
});

app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req?.params?.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Items Found" });
  }
});

app.patch("/update-product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search-product/:key?", async (req, res) => {
  // ? used for optional query param
  const searchKey = req.params.key;
  let result;
  if (!searchKey) {
    result = await Product.find();
  } else {
    result = await Product.find({
      $or: [
        { name: { $regex: searchKey, $options: "i" } }, //$options: "i" is for case insensitive values
        { price: { $regex: searchKey, $options: "i" } },
        { category: { $regex: searchKey, $options: "i" } },
        { company: { $regex: searchKey, $options: "i" } },
      ],
    });
  }

  res.send(result);
});

app.listen(5000);
