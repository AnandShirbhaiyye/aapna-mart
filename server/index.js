import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

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

app.get("/products", async (req, res) => {
  const products = await Product.find();

  res.json({
    success: true,
    data: products,
    message: "products fetched successfully...",
  });
});

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

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  res.json({
    success: true,
    data: product,
    message: "product fetched successfully...",
  });
});

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;

  await Product.deleteOne({ _id: id });

  res.json({
    success: true,
    message: "product deleted successfully...",
  });
});

app.get("/search-products", async (req, res) => {
  const { q } = req.query;

  const products = await Product.find({ name: { $regex: q, $options: "i" } });

  res.json({
    success: true,
    data: products,
    message: "products fetched successfully",
  });
});

// PUT / products
app.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category, brand } = req.body;

  await Product.updateOne(
    { _id: id },
    {
      $set: {
        name,
        description,
        price,
        image,
        category,
        brand,
      },
    }
  );
  const updatedProducts = await Product.findById(id);

  res.json({
    success: true,
    data: updatedProducts,
    message: "Product updated successfully",
  });
});

//post / order
app.post("/order", async (req, res) => {
  const { user, product, quantity, shippingAddress, deliveryCharges, status } =
    req.body;

  const order = new Order({
    user: user,
    product: product,
    quantity: quantity,
    shippingAddress: shippingAddress,
    deliveryCharges: deliveryCharges,
    status: status,
  });

  try {
    const savedOrder = await order.save();

    res.json({
      success: true,
      data: savedOrder,
      message: "Order created successfully",
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
});

// get order by id
app.get("/order/:id", async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ _id: id }).populate("user product");

  order.user.password = undefined;

  res.json({
    success: "true",
    data: order,
    message: "Order fetched succesfully..!",
  });
});

// get all orders by user
app.get("/order/user/:id", async (req, res) => {
  const { id } = req.params;
  const orders = await Order.find({ user: id }).populate("user  product");

  orders.forEach((Order) => {
    Order.user.password = undefined;
  });
  res.json({
    success: "true",
    data: orders,
    message: " Orders fetch successfully..!",
  });
});

// get all orders
app.get("/oreders", async (req, res) => {
  const allOrders = await Order.find();
  res.json({
    success: "true",
    data: allOrders,
    message: "Orders fetch successfully..!",
  });
});

//update status
app.patch("/order/status/:id", async (req, res) => {
  const { status } = req.body;

  const { id } = req.params;

  await Order.updateOne({ _id: id }, { $set: { status: status } });

  const updatedStatus = await Order.findOne({ _id: id });

  res.json({
    success: "true",
    data: updatedStatus,
    message: "order status updated successfully..!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
