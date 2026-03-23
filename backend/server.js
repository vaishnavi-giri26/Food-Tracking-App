 require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Order = require("./models/order");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({
 origin: "https://food-tracking-app-qyhd.onrender.com",
 credentials: true
}));
app.use(express.json());

// ================= MongoDB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));


// ================= Middleware =================
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// ================= Auth =================
app.use("/api/auth", authRoutes);

// ================= CREATE ORDER =================
app.post("/orders", verifyToken, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const lastOrder = await Order.findOne().sort({ orderId: -1 });
    const newOrderId = lastOrder ? lastOrder.orderId + 1 : 1;

    const order = new Order({
      orderId: newOrderId,
      items,
      totalAmount,
      userId: req.user.id,
    });

    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: "Error creating order" });
  }
});

// ================= GET ORDERS =================
app.get("/orders", verifyToken, async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ userId: req.user.id })
        .populate("userId", "name email")
        .sort({ createdAt: -1 });
    }

    res.json({ success: true, orders });
  } catch {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

    

// ================= UPDATE STATUS =================
app.put("/orders/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
   if (!order) {
  return res.status(404).json({ message: "Order not found" });
}
    order.status = status;

    await order.save();

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Error updating status" });
  }
});
// ================= DELETE =================
app.delete("/orders/:id", verifyToken, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running 🚀"));  
