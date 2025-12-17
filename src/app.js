import express from "express";
import cors from "cors";
import basketRoutes from "./routes/basketRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Aviders Basket Checkout Service Live",
    version: "1.0.0",
    endpoints: {
      checkout: "POST /basket/checkout",
    },
  });
});

// Routes
app.use("/basket", basketRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
