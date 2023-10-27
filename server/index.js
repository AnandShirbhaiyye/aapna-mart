import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Product from "./models/Product.js";

const app = express();
app.use(express.json());

dotenv.config();

async function connectMongoDB() {
  const conn = await mongoose.connect(process.env.MONGODB_URL);
  if (conn) {
    console.log("Connected to MongoDB📦");
  }
}
connectMongoDB();

//health api
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "All Good🥳🥳",
  });
});

// sign up
app.post("/signup", async (req, res) => {
  const { name, email, password, mobile, address, gender } = req.body;

  const user = new User({
    name: name,
    email: email,
    password: password,
    mobile: mobile,
    address: address,
    gender: gender,
  });

  try {
    const savedUser = await user.save();

    res.json({
      success: true,
      data: savedUser,
      message: "signup successfully...",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "please provide email and password",
    });
  }
  const user = await User.findOne({
    email: email,
    password: password,
  }).select("address gender name mobile");

  if (user) {
    return res.json({
      success: true,
      data: user,
      message: "login successfull...",
    });
  } else {
    return res.json({
      success: false,
      message: "invalid credentials...",
    });
  }
});


// fetched all products
app.get("/products", async (req, res) => {
  const products = await Product.find();

  res.json({
    success: true,
    data: products,
    message: "products fetched successfully...",
  });
});

// add product
app.post("/product", async (req, res) => {
  const { name, description, price, brand, image, category } = req.body;

  const product = new Product({
    name: name,
    description: description,
    price: price,
    brand: brand,
    image: image,
    category: category,
  });

  try {
    const savedProduct = await product.save();

    res.json({
      success: true,
      data: savedProduct,
      message: "product added successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
