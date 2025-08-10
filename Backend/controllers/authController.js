import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, profileImageUrl } = req.body;
        console.log("Request body:", req.body);


        // Check if user already exists
        const userExit = await User.findOne({ email });
        console.log("Checking if user exists...");
        if (userExit) {
            return res.status(400).json({ message: "User already exists" });

        }


        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Password hashed successfully");

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            profileImageUrl
        })
        console.log("New user created:", user);


        res.status(201).json({
            _id: user._id,
            name: user.username,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error when register" });
    }
};


// @desc   Register a new user
// @route  POST /api/auth/login
// @access Public

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Request body:", req.body);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Check if password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        console.log("User authenticated successfully");


        // Return user data and token
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: "Server error when login" });

    }
};

// @desc   Register a new user
// @route  POST /api/auth/login
// @access Public

export const getUserProfile = async (req, res) => {

    try {
        const userId = req.user._id ;


        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User profile fetched successfully");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error when fetching user profile" });
    }
};






