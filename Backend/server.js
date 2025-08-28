// Load environment variables before anything else
import dotenv from 'dotenv';
dotenv.config();

// External imports
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Internal imports
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import { protect } from './middlewares/authMiddleware.js';
import {
  generateExplaination,
  generateInteviewQuestion,
} from './controllers/aiControllers.js';

// Setup __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Log the Gemini API Key (just for debugging - remove in prod)
console.log('Gemini Key:', process.env.GEMINIAPIKEY);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "*" }));



app.use(express.json()); // Body parser
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static uploads

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Server is running');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/question', questionRoutes);

// AI routes
app.post('/api/ai/generate-question', protect, generateInteviewQuestion);
app.post('/api/ai/generate-explaination', protect, generateExplaination);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
