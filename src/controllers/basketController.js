import { 
  pickWishlist, 
  clearList, 
  addMultipleToList, 
  redirectUrl 
} from "../services/amazonWishlist.js";

/**
 * Checkout basket via Amazon wishlist
 * 
 * POST /basket/checkout
 * Body: { items: [{ asin, qty }], region?: "IN" | "US" }
 */
export const checkoutBasket = async (req, res) => {
  try {
    const { items, region = "IN" } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Items array is required and must not be empty" 
      });
    }

    // Validate each item
    for (const item of items) {
      if (!item.asin) {
        return res.status(400).json({ 
          success: false,
          message: "Each item must have an 'asin' field" 
        });
      }
    }

    console.log(`🛒 Checkout initiated for ${items.length} items (region: ${region})`);

    // Pick a random wishlist
    const listId = pickWishlist();

    // Clear existing items
    await clearList(listId);

    // Add all items
    await addMultipleToList(listId, items);

    // Generate affiliate URL
    const url = redirectUrl(listId, region);

    console.log(`✅ Checkout successful. Redirect URL generated.`);

    res.json({ 
      success: true, 
      url,
      listId,
      itemCount: items.length,
    });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to process checkout",
      error: err.message,
    });
  }
};

/**
 * Get service health status
 * 
 * GET /basket/health
 */
export const healthCheck = async (req, res) => {
  res.json({
    success: true,
    message: "Service is healthy",
    timestamp: new Date().toISOString(),
  });
};
