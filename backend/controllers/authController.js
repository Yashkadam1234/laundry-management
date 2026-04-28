const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔐 Generate JWT Token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

/* =========================
   REGISTER USER
========================= */
exports.register = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if user exists
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    console.log("USER CREATED:", user._id);

    // Return token
    res.status(201).json({
      token: generateToken(user._id)
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);

    res.status(500).json({
      message: "Server error during registration"
    });
  }
};

/* =========================
   LOGIN USER
========================= */
exports.login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const match = await user.matchPassword(password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    res.json({
      token: generateToken(user._id)
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    res.status(500).json({
      message: "Server error during login"
    });
  }
};