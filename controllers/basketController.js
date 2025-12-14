import Basket from "../models/Basket.js";
import { pickWishlist, clearList, addToList, redirectUrl } from "../services/amazonWishlist.js";

export const checkoutBasket = async (req, res) => {
  try {
    const { items } = req.body;

    const listId = pickWishlist();

    await clearList(listId);

    for (const item of items) {
      await addToList(listId, item.asin, item.qty);
    }

    const url = redirectUrl(listId);

    res.json({ success: true, url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
