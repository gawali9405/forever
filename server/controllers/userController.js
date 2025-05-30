import UserModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Route for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials " });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error, please try again logging in",
      error: error.message,
      success: false,
    });
  }
};

// Route for user registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      success: true,
      message: "Registration successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error, please try again registering",
      error: error.message,
      success: false,
    });
  }
};

// Route for admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) { 
      const adminPayload = {
        email: email,
        password:password,
        role: "admin",
      };

      const token = jwt.sign(adminPayload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      return res.status(200).json({
        message: "Admin login successful",
        success: true,
        token,
      });
    }

    return res.status(400).json({
      message: "Invalid admin credentials",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error, please try again logging in",
      error: error.message,
      success: false,
    });
  }
};
