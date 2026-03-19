const express = require("express");
const router = express.Router();
const User = require("../models/user");  
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    // Normalize email
    email = email.trim().toLowerCase();

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    await user.save();

    res.json({ message: "Registered successfully" });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // Normalize email
    email = email.trim().toLowerCase();

    //  Find user
    const user = await User.findOne({ email });

    console.log("Searching email:", email);
    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    //  Check password
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //  Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;