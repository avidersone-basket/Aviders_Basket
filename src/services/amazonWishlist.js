const wishlists = [
  "2UXWTCZV1NEL2",
  "KRF7Z0109CDU",
  "24VB0A2VMIWFX",
  "1A37JWTZP80MQ",
  "2MW3NMKMDBM4B"
];

export function pickWishlist() {
  return wishlists[Math.floor(Math.random() * wishlists.length)];
}

export async function clearList(listId) {
  await fetch(`https://www.amazon.in/hz/wishlist/ls/${listId}/clear`);
}

export async function addToList(listId, asin, qty) {
  await fetch(
    `https://www.amazon.in/hz/wishlist/ls/${listId}/add?asin=${asin}&quantity=${qty}`
  );
}

export function redirectUrl(listId) {
  return `https://www.amazon.in/hz/wishlist/ls/${listId}?ref_=wl_share&tag=${process.env.AFFILIATE_TAG_IN}`;
}
