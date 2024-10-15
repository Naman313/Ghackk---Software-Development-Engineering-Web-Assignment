import path from "path"; 
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authroutes from "../backend/routes/authroutes.js";
import favoritesRoutes from "../backend/routes/favoritesRoutes.js";
import connectToDB from "./db/connectToDb.js";
import cors from 'cors';

const __dirname = path.resolve(); // Get the current directory path
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// CORS middleware - allow requests from the frontend application
app.use(cors({
    origin: 'http://localhost:3000', // Change this to your frontend URL on Render after deployment
}));

// Add middleware to parse JSON request bodies
app.use(express.json()); // Necessary for parsing incoming JSON payloads

// Middleware for cookie parsing
app.use(cookieParser());

// Auth routes middleware
app.use("/api/auth", authroutes);
app.use("/fav", favoritesRoutes);

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle any other requests by serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Connect to the database and start the server
app.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`);
});
