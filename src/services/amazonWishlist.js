/**
 * Amazon Wishlist Management Service
 * 
 * Manages multiple wishlists for concurrent user checkouts
 */

// Pool of Amazon wishlists for rotation
const wishlists = [
  "2UXWTCZV1NEL2",
  "KRF7Z0109CDU",
  "24VB0A2VMIWFX",
  "1A37JWTZP80MQ",
  "2MW3NMKMDBM4B"
];

/**
 * Pick a random wishlist from the pool
 */
export function pickWishlist() {
  const randomIndex = Math.floor(Math.random() * wishlists.length);
  const listId = wishlists[randomIndex];
  console.log(`📋 Selected wishlist: ${listId}`);
  return listId;
}

/**
 * Clear all items from a wishlist
 */
export async function clearList(listId) {
  try {
    console.log(`🧹 Clearing wishlist: ${listId}`);
    await fetch(`https://www.amazon.in/hz/wishlist/ls/${listId}/clear`, {
      method: "POST",
    });
    console.log(`✅ Wishlist cleared: ${listId}`);
  } catch (err) {
    console.error(`❌ Failed to clear wishlist ${listId}:`, err);
    throw err;
  }
}

/**
 * Add an item to a wishlist
 */
export async function addToList(listId, asin, qty = 1) {
  try {
    console.log(`➕ Adding to wishlist ${listId}: ${asin} (qty: ${qty})`);
    await fetch(
      `https://www.amazon.in/hz/wishlist/ls/${listId}/add?asin=${asin}&quantity=${qty}`,
      { method: "POST" }
    );
    console.log(`✅ Added: ${asin}`);
  } catch (err) {
    console.error(`❌ Failed to add ${asin} to wishlist ${listId}:`, err);
    throw err;
  }
}

/**
 * Generate affiliate redirect URL
 */
export function redirectUrl(listId, region = "IN") {
  const affiliateTag = region === "US" 
    ? process.env.AFFILIATE_TAG_US 
    : process.env.AFFILIATE_TAG_IN;
  
  const domain = region === "US" ? "amazon.com" : "amazon.in";
  
  const url = `https://www.${domain}/hz/wishlist/ls/${listId}?ref_=wl_share&tag=${affiliateTag}`;
  
  console.log(`🔗 Generated URL: ${url}`);
  return url;
}

/**
 * Add multiple items to wishlist in batch
 */
export async function addMultipleToList(listId, items) {
  console.log(`📦 Adding ${items.length} items to wishlist ${listId}`);
  
  for (const item of items) {
    await addToList(listId, item.asin, item.qty || 1);
  }
  
  console.log(`✅ All items added to wishlist ${listId}`);
}

/**
 * Get available wishlists
 */
export function getAvailableWishlists() {
  return [...wishlists];
}
