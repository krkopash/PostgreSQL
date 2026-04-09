import { Router } from "express";
import { db } from "../db";
import { carts, cartItems } from "../db/schema";
import { eq, and } from "drizzle-orm";

const router = Router();
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cart = await db.select().from(carts).where(eq(carts.userId, userId));
  let cartId;
  if (cart.length === 0) {
    const newCart = await db.insert(carts).values({userId}).returning();
    cartId=newCart[0].id;
  } 
  else {
    cartId=cart[0].id;
  }
  const existingItem = await db.select().from(cartItems).where(and(eq(cartItems.productId, productId),eq(cartItems.cartId,cartId)));

  if (existingItem.length > 0) {
    await db.update(cartItems).set({ quantity: existingItem[0].quantity+quantity}).where(eq(cartItems.id, existingItem[0].id));
  } else {
    await db.insert(cartItems).values({cartId,productId,quantity,});
  }
  res.json({ message: "Added to cart" });
});

router.get("/:userId", async (req, res) => {
  const userId = Number(req.params.userId);

  const cart = await db.select().from(carts).where(eq(carts.userId, userId));
  if (cart.length === 0) {
    return res.json([]);
  }
  const items = await db.select().from(cartItems).where(eq(cartItems.cartId, cart[0].id));
  res.json(items);
});

router.delete("/remove/:itemId", async (req, res) => {
  const itemId = Number(req.params.itemId);
  await db.delete(cartItems).where(eq(cartItems.id, itemId));
  res.json({ message:"remove item"});
});

router.delete("/clear/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const cart = await db.select().from(carts).where(eq(carts.userId, userId));
  if (cart.length === 0) {
    return res.json({message:"Cart empty"});
  }
  await db.delete(cartItems).where(eq(cartItems.cartId, cart[0].id));
  res.json({ message:"clear" });
});

export default router;