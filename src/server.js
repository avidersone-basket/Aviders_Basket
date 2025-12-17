import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8081;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Aviders Basket Checkout Service running on port ${PORT}`);
  console.log(`🌐 API endpoint: http://localhost:${PORT}/basket/checkout`);
});
