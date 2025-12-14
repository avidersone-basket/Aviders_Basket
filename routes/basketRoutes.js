import express from "express";
import { checkoutBasket } from "../controllers/basketController.js";

const router = express.Router();

router.post("/checkout", checkoutBasket);

export default router;
