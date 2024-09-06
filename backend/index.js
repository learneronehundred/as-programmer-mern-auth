import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
// Allows us to parse incoming requests with JSON payloads, req.body.
app.use(express.json());

// Allows us to parse incoming cookies
app.use(cookieParser());

app.use(
  cors({
    origin: `${process.env.LOCAL_FRONTEND_URL}`,
    credentials: true,
  })
);

// Testing
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
