import express from "express";
import { checkoutBasket, healthCheck } from "../controllers/basketController.js";

const router = express.Router();

/**
 * 🛒 CHECKOUT BASKET
 * POST /basket/checkout
 * Body: { items: [{ asin, qty }], region?: "IN" | "US" }
 */
router.post("/checkout", checkoutBasket);

/**
 * 💚 HEALTH CHECK
 * GET /basket/health
 */
router.get("/health", healthCheck);

export default router;
