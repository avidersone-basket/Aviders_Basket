# Aviders Basket Frontend Service

Frontend/Checkout service for managing Amazon wishlist-based basket checkout flow.

## Features

- ✅ Multi-wishlist management
- ✅ Automatic wishlist rotation
- ✅ Amazon affiliate link generation
- ✅ Bulk add to wishlist
- ✅ Checkout flow integration

## Tech Stack

- **Node.js** with Express
- **MongoDB** with Mongoose (for basket data)
- **Amazon Wishlist API** integration
- **CORS** enabled

## API Endpoints

### POST /basket/checkout
Checkout basket items via Amazon wishlist

**Request Body:**
```json
{
  "items": [
    {
      "asin": "B08XYZ123",
      "qty": 2
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://www.amazon.in/hz/wishlist/ls/XXXXX?ref_=wl_share&tag=YOUR_TAG"
}
```

## Environment Variables

Create a `.env` file:

```env
AFFILIATE_TAG_IN=your-affiliate-tag-21
AFFILIATE_TAG_US=your-us-affiliate-tag-20
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/aviders_basket
PORT=8081
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## How It Works

1. User initiates checkout with basket items (ASINs + quantities)
2. System picks a random wishlist from the pool
3. Clears the selected wishlist
4. Adds all items to the wishlist
5. Returns affiliate URL for checkout

## Wishlist Pool Management

The system rotates between multiple Amazon wishlists to handle concurrent users. Wishlists are defined in `src/services/amazonWishlist.js`:

```javascript
const wishlists = [
  "2UXWTCZV1NEL2",
  "KRF7Z0109CDU",
  // ... add more
];
```

## Integration with Main App

This service is designed to work with the Aviders Flutter app and the basket backend. The typical flow:

1. User manages basket items via the **Backend API** (add/remove/schedule)
2. When ready to checkout, Flutter app calls this **Frontend Service**
3. Service generates Amazon wishlist URL
4. User is redirected to Amazon to complete purchase

## License

MIT
