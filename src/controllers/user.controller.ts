import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

// Secret for JWT (you should store this in an environment variable)

export const register = async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET || "onlinestore";
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Respond with the token
    res
      .status(201)
      .json({ token, user: { id: newUser._id, username: newUser.username } });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const login = async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET || "onlinestore";

  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Respond with the token
    res
      .status(200)
      .json({ token, user: { id: user._id, username: user.username } });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
