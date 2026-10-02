import "dotenv/config";

import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./config/db.js";
import ipoRoutes from "./routes/ipoRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the IPO Tracker API",
  });
});

app.use("/api/ipos", ipoRoutes);
app.use("/api/market", marketRoutes);

// Connect to MongoDB


(async function () {
    const port = process.env.PORT || 4000
    try {
        await Promise.all([
            connectDB(),
        ])
        app.listen(port, () => {
            console.log("Server started on Port : ", port);
        })
    } catch (error) {
        console.error("Error starting server:", error.message);
    }
}())

export default app;