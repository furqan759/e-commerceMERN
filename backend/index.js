const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-commerce-4fd3e-default-rtdb.firebaseio.com",
});

const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    try {
      jwt.verify(token, process.env.JWTKEY, (err, success) => {
        if (err) {
          verifyFirebaseToken(token, next, res);
        } else {
          next();
        }
      });
    } catch (err) {
      res.status(500).send({ result: "Internal Server Error" });
    }
  } else {
    res.status(403).send({ result: "Missing Authorization headers" });
  }
};

const verifyFirebaseToken = async (token, next, res) => {
  try {
    const decodedFirebaseToken = await admin.auth().verifyIdToken(token);
    if (decodedFirebaseToken) {
      return next();
    } else {
      res.status(498).send({ result: "Internal Server Error" });
    }
  } catch (err) {
    res.status(500).send({ result: "Internal Server Error" });
  }
};

app.post("/register", async (req, res) => {
  if (req.body.email && req.body.password && req.body.name) {
    const userDetails = await User.findOne({ email: req.body.email });
    if (userDetails) {
      return res.status(409).send({ result: "Email already registered" });
    }
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject(); // To remove password in response data
    delete result.password;
    jwt.sign(
      { result },
      process.env.JWTKEY,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          res.status(400).send({ result: "Internal Server Error" });
        }
        res.send({ result, auth: token });
      }
    );
  } else {
    res.status(422).send({ result: "Missing Field Values" });
  }
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password"); // remove password in response data
    if (user) {
      jwt.sign(
        { user },
        process.env.JWTKEY,
        { expiresIn: "2h" },
        (err, token) => {
          if (err) {
            res.send({ result: "Something went wrong" });
          }
          res.send({ user, auth: token });
        }
      );
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.status(422).send({ result: "Missing Field Values" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.post("/products", verifyToken, async (req, res) => {
  if (req) {
    let products = await Product.find({ userId: req.body?.userId });
    if (products) {
      res.send(products);
    } else {
      res.send({ result: "No Products Found" });
    }
  } else {
    res.send({ result: "Server Error!" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req?.params?.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "Deletion Failed" });
  }
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req?.params?.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Items Found" });
  }
});

app.patch("/update-product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search-product/:key?", verifyToken, async (req, res) => {
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
