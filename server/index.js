import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";

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

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "All Good🥳🥳",
  });
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
