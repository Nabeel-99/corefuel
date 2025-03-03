import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/auth", authRoutes);
const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
