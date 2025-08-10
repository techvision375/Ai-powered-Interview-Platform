import express from "express";
import {
    registerUser,
    loginUser,
    getUserProfile
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import  upload  from "../middlewares/uploadMiddlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

router.post("/upload-image", upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Server error when uploading image" });
    }
}
);

export default router;

// 1. router.post("/upload-image", upload.single("image"), ...)
// POST /upload-image: This sets up an endpoint to handle image uploads.

// upload.single("image"): Middleware provided by Multer (a file upload library). It:
// Handles a single file upload from the form field named "image".
// Adds the uploaded file to req.file.

// 2. if (!req.file)
// Checks if a file was actually uploaded.



// 3. const imageUrl = ...
// Builds a public URL to access the uploaded image:
// req.protocol → http or https
// req.get("host") → the domain + port (like localhost:5000)
// /uploads/${req.file.filename} → path where the image is saved
// So if your server is running on localhost:5000 and the image filename is pic.jpg, you get: