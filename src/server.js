import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

// connect DB first
await connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});

