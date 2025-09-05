import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/usermodel.js';

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
};

// LOGIN USER
export const loginuser = async (req, res) => {
  try {
    console.log("Login request body:", req.body); // ✅ log request

    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Email and password required" });
    }

    const user = await userModel.findOne({ email });
    console.log("User found:", user); // ✅ log user

    if (!user) return res.json({ success: false, message: "User does not exist" });

    const isMatch = await bcrypt.compare(String(password), user.password);
    console.log("Password match:", isMatch); // ✅ log password check

    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    console.log("Token generated:", token); // ✅ log token

    res.json({ success: true, token, role: user.role });
  } catch (error) {
    console.error("Login error:", error); // ✅ full stack
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// REGISTER USER
export const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const exist = await userModel.findOne({ email });
    if (exist) return res.json({ success: false, message: "User already exists" });

    if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid email" });
    if (password.length < 8) return res.json({ success: false, message: "Password must be at least 8 characters" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(password), salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    const token = createToken(savedUser._id);

    res.json({ success: true, token });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ADMIN LOGIN
export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
      return res.json({ success: true, token, role: "admin" });
    }

    res.json({ success: false, message: "Invalid admin credentials" });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
