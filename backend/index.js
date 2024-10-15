import path from "path"; 
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authroutes from "../backend/routes/authroutes.js";
import  favoritesRoutes from "../backend/routes/favoritesRoutes.js"
import connectToDB from "./db/connectToDb.js";
import cors from 'cors';

const __dirname = path.resolve();
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// CORS middleware - allow requests from the frontend application
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
}));

// Add middleware to parse JSON request bodies
app.use(express.json()); // This is necessary for parsing incoming JSON payloads

// Middleware for cookie parsing
app.use(cookieParser());

// Auth routes middleware
app.use("/api/auth", authroutes);
app.use("/fav", favoritesRoutes );

// Base route
app.get("/", (req, res) => {
    res.send(`Hello World! Server is running on port ${PORT}`);
    console.log(`I am Naman Dubey`);
});

// Connect to the database and start the server
app.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`);
});
