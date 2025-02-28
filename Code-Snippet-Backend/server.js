import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import codeRoutes from "./routes/codeRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// app.use("/", (req, res)=>{
//     res.send("Server is running")
// })
app.use(cors());

app.use("/api/snippets", codeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
